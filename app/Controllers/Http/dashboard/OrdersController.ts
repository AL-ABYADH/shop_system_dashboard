'use strict'

import Order from 'App/Models/Order'
class OrdersController {
    async handleOrder({ params, response }) {
        try {
            const orderId = params.id
            const order = await Order.find(orderId)

            if (!order) {
                return response.status(404).json({ message: 'Order not found' })
            }

            // Check and update the order status based on the current status
            if (order.status === 'awaiting') {
                order.status = 'confirming'
            } else if (order.status === 'confirmed') {
                order.status = 'testing'
            } else {
                return response
                    .status(400)
                    .json({ message: 'Ivalid order states' })
            }

            await order.save()

            return response
                .status(200)
                .json({ message: 'Order status updated successfully' })
        } catch (error) {
            return response.status(500).json({
                error: 'An error occurred while updating the order status',
            })
        }
    }
}

module.exports = OrdersController
