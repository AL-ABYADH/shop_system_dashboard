import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export default class OrderSeeder extends BaseSeeder {
    public async run() {
        // Find all customers
        const customers = await User.query().where('role', 'customer')

        const orders: Array<any> = []

        let orderId = 1

        for (const customer of customers) {
            // Create 5 orders for each customer
            for (let i = 0; i < 5; i++) {
                const sellerUserId = await this.getRandomSellerId()
                const customerAddressId =
                    await this.getCorrespondingCustomerAddressId(customer.id)
                const sellerAddressId =
                    await this.getCorrespondingSellerAddressId(sellerUserId)

                orders.push({
                    id: orderId,
                    customerUserId: customer.id,
                    sellerUserId: sellerUserId,
                    adminUserId: null,
                    paymentMethodId: 1,
                    sellerAddressId: sellerAddressId!,
                    customerAddressId: customerAddressId!,
                    deliveryPrice: this.getRandomDeliveryPrice(),
                    totalPrice: 0,
                    currency: customer.preferredCurrency!,
                    status: 'awaiting',
                })
                orderId++
            }
        }
        await Order.updateOrCreateMany('id', orders)
    }

    private getRandomSellerId = async (): Promise<number> => {
        // Query the database to get seller IDs
        const sellers = await User.query().where('role', 'seller')

        // Choose a random seller ID from the retrieved IDs
        const randomIndex = Math.floor(Math.random() * sellers.length)
        return sellers[randomIndex].id
    }

    private getCorrespondingSellerAddressId = async (
        sellerId: number
    ): Promise<number | null> => {
        // Query the database to get the seller's address for the given customer
        const sellerAddress = await Address.query()
            .where('userId', sellerId) // Find addresses related to the customer
            .first()

        return sellerAddress ? sellerAddress.id : null
    }

    private getCorrespondingCustomerAddressId = async (
        customerId: number
    ): Promise<number | null> => {
        // Query the database to get the customer's address for the given customer
        const customerAddress = await Address.query()
            .where('userId', customerId) // Find addresses owned by the customer
            .first()

        return customerAddress ? customerAddress.id : null
    }

    private getRandomDeliveryPrice = (): number | null => {
        // Generate random delivery prices or null values
        // Replace this with your actual logic
        return Math.random() < 0.5 ? null : Math.floor(Math.random() * 100)
    }
}
