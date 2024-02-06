import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'

export default class CustomerOrdersController {
    public async getOngoingOrders({ request, response }: HttpContextContract) {}

    public async getFinishedOrders({
        request,
        response,
    }: HttpContextContract) {}

    public async createOrder({ request, response }: HttpContextContract) {}

    public async cancelOrder({ params, response }) {
        try {
            const orderId = params.id
            const order = await Order.find(orderId)

            if (!order) {
                return response.status(404).json({ message: 'Order not found' })
            }

            // Check and update the order status based on the current status
            order.status = 'testing'
            await order.save()

            return response
                .status(200)
                .json({ message: 'Order status was cancelled' })
        } catch (error) {
            return response.status(500).json({
                error: 'An error occurred while updating the order status',
            })
        }
    }
}
