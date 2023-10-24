import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import ProductItem from 'App/Models/ProductItem'

export default class OrderItemSeeder extends BaseSeeder {
    public async run() {
        const orders = await Order.all()

        // Get the first 75 product items
        const productItems = await ProductItem.query().where(
            'status',
            'available'
        )

        // Counter for product items
        let productItemCount = 0

        const orderItems: Array<any> = []

        for (const order of orders) {
            for (let i = 0; i < 3; i++) {
                const productItem = productItems[productItemCount]
                orderItems.push({
                    id: productItemCount + 1,
                    orderId: order.id,
                    productItemId: productItem.id,
                })
                productItem.status = 'reserved'
                productItemCount++
            }
        }

        await OrderItem.updateOrCreateMany('id', orderItems)
    }
}
