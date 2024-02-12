import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import Product from 'App/Models/Product'
import ProductItem from 'App/Models/ProductItem'
import ImageItems from 'Database/migrations/1694510470366_image_items'

export default class CustomerOrdersController {
    public async getOngoingOrders({ auth, response }: HttpContextContract) {
        const user = auth.user!
        const ongoingOrders = await Order.query()
            .where('customerUserId', user.id)
            .whereIn('status', [
                'awaiting',
                'confirming',
                'confirmed',
                'testing',
            ])
            .preload('seller', (sellerQuery) => {
                sellerQuery.select('fullName')
            })
            .preload('orderItems', (orderItemsQuery) => {
                orderItemsQuery
                    .preload('productItem', (productItemQuery) => {
                        productItemQuery
                            .preload('product', (productQuery) => {
                                productQuery.select(
                                    // 'id',
                                    'name'
                                    // 'brand',
                                    // 'models',
                                    // 'flaws'
                                )
                            })
                            .preload('price', (x) => {
                                x.select('price')
                            })
                            .preload('imagesGroup', (ImageItems) => {
                                ImageItems.preload('imageItems', (i) => {
                                    i.select('image_url')
                                })
                            })
                    })
                    .select(
                        'id',
                        'order_id',
                        'order_item_price',
                        'product_item_id'
                    )
            })
            .select(
                'id',
                'sellerUserId',
                'createdAt',
                'totalPrice',
                'currency',
                'status'
            )

        // Transform the data to match the required output structure
        const transformedOrders = ongoingOrders.map((order) => ({
            ...order.serialize(),
            orderItems: order.orderItems.map((item) => ({
                ...item.serialize(),
                productItem: {
                    ...item.productItem.serialize(),
                    orderItemName: item.productItem.product.serialize(),
                },
            })),
        }))

        response.ok(transformedOrders)
    }

    public async getFinishedOrders({ auth, response }: HttpContextContract) {
        try {
            const user = await auth.authenticate()

            const orders = await Order.query()
                .where('customer_user_id', user.id)
                .andWhere('status', 'done')
                .preload('seller')
                .preload('sellerAddress')
                .preload('orderItems', (orderItemsQuery) => {
                    orderItemsQuery.preload('productItem', (query) => {
                        query
                            .preload('product')
                            .preload('price')
                            .preload('imagesGroup', (ImageItems) => {
                                ImageItems.preload('imageItems', (i) => {
                                    i.select('image_url')
                                })
                            })
                    })
                })

            const formattedOrders = orders.map((order) => ({
                id: order.id,
                date: order.createdAt.toLocaleString(),
                deliveryPrice: order.deliveryPrice,
                currency: order.currency,
                totalPrice: order.totalPrice,
                commission: order.companyCommission + order.adminCommission, // اجمع العمولات
                customerAddress: order.customerAddress?.address,
                devicesNumber: order.orderItems.length,
                time: order.createdAt.toLocaleString(),
                orderStatus: order.status,
                orderItems: order.orderItems.map((item) => ({
                    id: item.id,
                    deviceName: item.productItem.product.name,
                    price: item.productItem.price.price,
                    flaws: item.productItem?.flaws,
                    description: item.productItem?.description,
                    usedProductCondition: item.productItem.usedProductCondition,
                    isUsed: item.productItem?.usedProduct ? 1 : 0,
                    expanded: false,
                    imageItems: item.productItem.imagesGroup.imageItems,
                })),
                sellerName: order.seller?.fullName,
                // sellerAddress: order.sellerAddress?.address,
                // sellerPhoneNumber: order.seller?.phoneNumber,
            }))

            return response.ok(formattedOrders)
        } catch (error) {
            console.error(error)
            return response.status(500).send({
                message: 'Unable to retrieve finished orders',
                error: error.message,
            })
        }
    }

    public async createOrder({ auth, request, response }: HttpContextContract) {
        try {
            const user = auth.user!
            const { product_item_id } = request.only(['product_item_id'])
            const product_item = await ProductItem.query()
                .where('id', product_item_id)
                .andWhere('status', 'available')
                .first()

            if (!product_item) {
                return response.badRequest({
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

    public async cancelOrder({ params, response, auth }: HttpContextContract) {
        const orderId = params.orderId
        const user = auth.user!

        const order = await Order.query()
            .where('id', orderId)
            .where('customerUserId', user.id)
            .first()
        if (order) {
            if (order.status in ['awaiting']) {
                order.status = 'canceled'
                await order.save()
                const orderItems = await order.related('orderItems').query()
                for (const item of orderItems) {
                    const productItem = await item
                        .related('productItem')
                        .query()
                        .firstOrFail()
                    productItem.status = 'available'
                    await productItem.save()
                }
                response.ok({ message: 'Order cancelled successfully' })
            } else {
                response.badRequest("you can't cancel this order")
            }
        } else {
            response.notFound({ message: 'Order not found ' })
        }
    }
}
