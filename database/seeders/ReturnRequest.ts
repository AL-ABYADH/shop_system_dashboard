import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Order from 'App/Models/Order'
import ReturnRequest from 'App/Models/ReturnRequest'
import ReturnRequestItem from 'App/Models/ReturnRequestItem'
import OrderItem from 'App/Models/OrderItem'

export default class ReturnRequestSeeder extends BaseSeeder {
    public async run() {
        const adminIds = [1, 4]
        const statuses: ('awaiting' | 'evaluating' | 'resolved')[] = [
            'awaiting',
            'evaluating',
            'resolved',
        ]

        for (const adminId of adminIds) {
            for (let i = 0; i < 6; i++) {
                const status = statuses[Math.floor(i / 2)] // This ensures 2 of each status per admin

                // Fetch a random order and update its status
                const order = await this.getRandomOrder()
                order.status = 'returnRequest'
                await order.save()

                // Create the return request
                const returnRequest = new ReturnRequest()
                returnRequest.fill({
                    orderId: order.id,
                    status: status,
                })
                await returnRequest.save()

                // Randomly create return request items linked to this return request
                await this.createReturnRequestItems(returnRequest.id, order.id)
            }
        }
    }

    private async getRandomOrder(): Promise<Order> {
        // Assuming you have a method to select a random order eligible for return
        // This is a simplified example; your actual logic may need to ensure the order is eligible for returns
        const orders = await Order.query().where(
            'status',
            '!=',
            'returnRequest'
        )
        return orders[Math.floor(Math.random() * orders.length)]
    }

    private async createReturnRequestItems(
        returnRequestId: number,
        orderId: number
    ) {
        // Fetch order items for the given order
        const orderItems = await OrderItem.query().where('orderId', orderId)
        const selectedItems = orderItems.slice(
            0,
            Math.floor(Math.random() * orderItems.length + 1)
        ) // Randomly select some items

        for (const item of selectedItems) {
            const returnRequestItem = new ReturnRequestItem()
            returnRequestItem.fill({
                returnRequestId: returnRequestId,
                orderItemId: item.id,
                reason: 'Sample reason', // You might want to randomize or specify actual reasons
            })
            await returnRequestItem.save()
        }
    }
}
