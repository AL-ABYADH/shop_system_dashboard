import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import Price from 'App/Models/Price'
import ProductItem from 'App/Models/ProductItem'
import User from 'App/Models/User'
import ExchangesController from 'App/Controllers/ExchangesController'

// Define the OrderStatus type
type OrderStatus =
    | 'confirming'
    | 'testing'
    | 'done'
    | 'confirmed'
    | 'awaiting'
    | 'canceled'
    | 'returnRequest'

export default class OrderSeeder extends BaseSeeder {
    public async run() {
        // Check if enough available product items exist
        const availableProductItemsCount = await ProductItem.query()
            .where('status', 'available')
            .count('* as total')

        const totalAvailable = parseInt(availableProductItemsCount[0].total, 10)

        // If not enough available items, assume the seeder has already run and exit
        if (totalAvailable < 75) {
            return
        }

        const customers = await User.query().where('role', 'customer')

        let orderId = 1

        // Get available product items
        const productItems = await ProductItem.query().where(
            'status',
            'available'
        )

        // Counter for product items
        let productItemCount = 0

        for (const customer of customers) {
            for (let i = 0; i < 5; i++) {
                const { status, adminUserId } = this.getRandomStatusAndAdmin()
                const sellerUserId = await this.getRandomSellerId()
                const customerAddressId =
                    await this.getCorrespondingCustomerAddressId(customer.id)
                const sellerAddressId =
                    await this.getCorrespondingSellerAddressId(sellerUserId)

                const deliveryPrice = 2

                let itemsPrice = 0

                const orderItems: Array<any> = []

                const order = {
                    id: orderId,
                    customerUserId: customer.id,
                    sellerUserId: sellerUserId,
                    adminUserId: adminUserId,
                    paymentMethodId: 1,
                    sellerAddressId: sellerAddressId!,
                    customerAddressId: customerAddressId!,
                    deliveryPrice: deliveryPrice,
                    totalPrice: 0,
                    itemsPrice: 0,
                    companyCommission: 0,
                    adminCommission: 0,
                    currency: customer.preferredCurrency!,
                    status: status, // This now correctly matches the OrderStatus type
                }
                const createdOrder = await Order.updateOrCreate(
                    { id: orderId },
                    order
                )

                for (let i = 0; i < 3; i++) {
                    const productItem = productItems[productItemCount]

                    // Check the currency of the item's price to convert it to the customer's preferred currency
                    const price = (await Price.find(productItem.priceId))!
                    if (price.currency != customer.preferredCurrency) {
                        const exchangeRates =
                            await ExchangesController.getExchanges()
                        itemsPrice +=
                            price.price *
                            Number(exchangeRates[customer.preferredCurrency!])
                        console.log('converted:')
                        console.log(price.currency)
                        console.log(customer.preferredCurrency)
                        console.log(price.price)
                        console.log(itemsPrice)
                    } else itemsPrice += price!.price

                    orderItems.push({
                        id: productItemCount + 1,
                        orderId: orderId,
                        productItemId: productItem.id,
                    })
                    productItem.status = status == 'done' ? 'sold' : 'reserved'
                    productItem.save()
                    productItemCount++
                }
                await OrderItem.updateOrCreateMany('id', orderItems)

                const companyCommission = itemsPrice * (5 / 100) // 5% of the total items price goes for the company
                const adminCommission = itemsPrice * (5 / 100) // 5% of the total items price goes for the admin

                createdOrder.totalPrice =
                    deliveryPrice +
                    itemsPrice +
                    companyCommission +
                    adminCommission
                createdOrder.itemsPrice = itemsPrice
                createdOrder.companyCommission = companyCommission
                createdOrder.adminCommission = adminCommission
                createdOrder.save()

                orderId++
            }
        }
    }

    private getRandomStatusAndAdmin(): {
        status: OrderStatus
        adminUserId: number | null
    } {
        const statuses: OrderStatus[] = [
            'confirming',
            'testing',
            'done',
            'confirmed',
            'awaiting',
        ]
        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)]

        if (randomStatus === 'confirmed' || randomStatus === 'awaiting') {
            return { status: randomStatus, adminUserId: null }
        } else {
            return { status: randomStatus, adminUserId: 1 }
        }
    }

    private getRandomSellerId = async (): Promise<number> => {
        const sellers = await User.query().where('role', 'seller')
        const randomIndex = Math.floor(Math.random() * sellers.length)
        return sellers[randomIndex].id
    }

    private getCorrespondingSellerAddressId = async (
        sellerId: number
    ): Promise<number | null> => {
        const sellerAddress = await Address.query()
            .where('userId', sellerId)
            .first()
        return sellerAddress ? sellerAddress.id : null
    }

    private getCorrespondingCustomerAddressId = async (
        customerId: number
    ): Promise<number | null> => {
        const customerAddress = await Address.query()
            .where('userId', customerId)
            .first()
        return customerAddress ? customerAddress.id : null
    }
}
