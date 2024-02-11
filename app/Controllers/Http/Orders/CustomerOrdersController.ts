import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import Product from 'App/Models/Product'
import ProductItem from 'App/Models/ProductItem'

export default class CustomerOrdersController {
    public async getOngoingOrders({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user!
            const orders = await Order.query()
                .where('user_id', user.id)
                .andWhereIn('status', [
                    'awaiting',
                    'confirming',
                    'confirmed',
                    'testing',
                ])
                .select(
                    'id',
                    'total_price',
                    'status',
                    'currency',
                    'created_at',
                    'updated_at'
                )
            return response.ok(orders)
        } catch (error) {
            return response.internalServerError({
                message: 'Unable to retrieve ongoing orders.',
                error: error.message,
            })
        }
    }

    public async getFinishedOrders({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user!
            const orders = await Order.query()
                .where('customer_user_id', user.id)
                .andWhere('status', 'done')
                .select(
                    'id',
                    'total_price',
                    'status',
                    'currency',
                    'created_at',
                    'updated_at'
                )

            return response.ok(orders)
        } catch (error) {
            return response.internalServerError({
                message: 'Unable to retrieve finished orders.',
                error: error.message,
            })
        }
    }

    public async createOrder({ auth, request, response }: HttpContextContract) {
        try {
            const user = auth.user!
            const { product_item_id } = request.only(['product_item_id'])
            const product_item = await ProductItem.query().where(
                'id',
                product_item_id
            )

            if (product_item[0]['states'] != 'available') {
                return response.ok({
                    message: 'the order not available',
                })
            }

            // const sellerUserId = ProductItem.query()
            // .where('id', product_item_id)
            // .select('seller_user_id')
            // .first()

            // const order = new Order()
            // order.customerUserId = user.id
            // order.status = 'awaiting'
            // await order.save()

            // const orderItem = new OrderItem()
            // orderItem.productItemId = product_item_id

            return response.ok(product_item)
        } catch (error) {
            return response.internalServerError({
                message: 'Failed to create order.',
                error: error.message,
            })
        }
    }

    public async cancelOrder({ params, response }) {
        try {
            const orderId = params.id
            const order = await Order.find(orderId)

            if (!order) {
                return response.notFound({ message: 'Order not found' })
            }

            // Check and update the order status based on the current status
            order.status = 'testing'
            await order.save()

            return response.ok({ message: 'Order status was cancelled' })
        } catch (error) {
            return response.internalServerError({
                error: 'An error occurred while updating the order status',
            })
        }
    }
}
