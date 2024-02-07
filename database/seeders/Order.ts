import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export default class OrderSeeder extends BaseSeeder {
    public async run() {
        const customers = await User.query().where('role', 'customer')

        const orders: Array<any> = []
        let orderId = 1

        for (const customer of customers) {
            for (let i = 0; i < 5; i++) {
                const { status, adminUserId } = this.getRandomStatusAndAdmin()
                const sellerUserId = await this.getRandomSellerId()
                const customerAddressId =
                    await this.getCorrespondingCustomerAddressId(customer.id)
                const sellerAddressId =
                    await this.getCorrespondingSellerAddressId(sellerUserId)

                orders.push({
                    id: orderId,
                    customerUserId: customer.id,
                    sellerUserId: sellerUserId,
                    adminUserId: adminUserId,
                    paymentMethodId: 1,
                    sellerAddressId: sellerAddressId!,
                    customerAddressId: customerAddressId!,
                    deliveryPrice: this.getRandomDeliveryPrice(),
                    totalPrice: 10000,
                    currency: customer.preferredCurrency!,
                    status: status,
                })
                orderId++
            }
        }
        await Order.updateOrCreateMany('id', orders)
    }

    private getRandomStatusAndAdmin() {
        const statuses = ['confirming', 'testing', 'done', 'confirmed']
        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)]

        if (randomStatus === 'confirmed') {
            return { status: randomStatus, adminUserId: null }
        } else if (randomStatus === 'awaiting') {
            return { status: 'awaiting', adminUserId: null }
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

    private getRandomDeliveryPrice = (): number | null => {
        return Math.random() < 0.5 ? null : Math.floor(Math.random() * 100)
    }
}
