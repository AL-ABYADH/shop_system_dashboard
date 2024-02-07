import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Address from 'App/Models/Address'
import OrderItem from 'App/Models/OrderItem'
import User from 'App/Models/User'
import ProductItem from '../../../Models/ProductItem'
import Product from 'App/Models/Product'
import Price from 'App/Models/Price'
import Flaw from 'App/Models/Flaw'
// import ImagesGroup from 'App/Models/ImagesGroup'
// import ImageItem from 'App/Models/ImageItem'

export default class AdminOrdersController {
    public async renderNewOrders({ inertia }) {
        const loadedOrder = await Order.query().whereIn('status', [
            'awaiting',
            'confirmed',
        ])

        const orders: Array<any> = []

        for (const order of loadedOrder) {
            const customerAddress = (
                await Address.query().where('userId', order.customerUserId)
            )[0]
            const customerUser = (
                await User.query().where('id', order.customerUserId)
            )[0]

            const loadedOrderItems = await OrderItem.query().where(
                'orderId',
                order.id
            )
            const sellerUser = (
                await User.query().where('id', order.sellerUserId)
            )[0]
            const sellerAddress = (
                await Address.query().where('userId', order.sellerUserId)
            )[0]
            const orderItems: Array<any> = []
            for (const orderItem of loadedOrderItems) {
                const productItemDetails = (
                    await ProductItem.query().where(
                        'id',
                        orderItem.productItemId
                    )
                )[0]
                const productDetails = (
                    await Product.query().where(
                        'id',
                        productItemDetails.productId
                    )
                )[0]
                const priceDetails = (
                    await Price.query().where('id', productItemDetails.priceId)
                )[0]
                const loadedFlaws = await Flaw.query().where(
                    'productItemId',
                    productItemDetails.id
                )
                const flaws: Array<any> = []
                for (const flaw of loadedFlaws) {
                    flaws.push({
                        flaw: flaw.flaw,
                        severity: flaw.severityLevel,
                    })
                }
                // const imagesGroup = (await ImagesGroup.query().where(
                //     'productItemId',
                //     productItemDetails.id
                // ))[0]

                // const imageItems: Array<any> = []

                // const imagesGroup = (
                //     await ImagesGroup.query().where(
                //         'productItemId	',
                //         productItemDetails.id
                //     )
                // )[0]

                // const loadedImageItems = await ImageItem.query().where(
                //     'imageGroupId',
                //     imagesGroup.id
                // )
                // for (const image of loadedImageItems) {
                //     imageItems.push({
                //         imagesUrl: image.imageUrl,
                //     })

                orderItems.push({
                    id: orderItem.id,
                    deviceName: productDetails.name,
                    price: priceDetails.price,
                    currency: priceDetails.currency,
                    deviceFlaws: flaws,
                    description: productItemDetails.description,
                    usedProductCondition:
                        productItemDetails.usedProductCondition,
                    isUsed: productItemDetails.usedProduct,
                    expanded: false,
                    // imageItems: imageItems,
                })
            }

            orders.push({
                id: order.id,
                customerName: customerUser.fullName,
                customerPhone: customerUser.phoneNumber,
                date: order.createdAt,
                deliveryPrice: order.deliveryPrice,
                customerImageUrl: customerUser.imageUrl,
                currency: order.currency,
                totalPrice: order.totalPrice,
                customerAddress: customerAddress.address,
                devicesNumber: orderItems.length,
                time: order.createdAt,
                orderStatus: order.status,
                orderItems: orderItems,
                sellerName: sellerUser.fullName,
                sellerAddress: sellerAddress.address,
                sellerPhoneNumber: sellerUser.phoneNumber,
            })
        }
        return inertia.render('homePageScreen', { orders })
    }

    public async renderHandledOrders({ inertia, auth }) {
        // Get the currently authenticated user
        const user = await auth.use('web').authenticate()

        const loadedOrder = await user
            .related('adminOrders')
            .query()
            .whereIn('status', ['confirming', 'testing'])

        const orders: Array<any> = []

        for (const order of loadedOrder) {
            const customerAddress = (
                await Address.query().where('userId', order.customerUserId)
            )[0]
            const customerUser = (
                await User.query().where('id', order.customerUserId)
            )[0]

            const loadedOrderItems = await OrderItem.query().where(
                'orderId',
                order.id
            )
            const sellerUser = (
                await User.query().where('id', order.sellerUserId)
            )[0]
            const sellerAddress = (
                await Address.query().where('userId', order.sellerUserId)
            )[0]
            const orderItems: Array<any> = []
            for (const orderItem of loadedOrderItems) {
                const productItemDetails = (
                    await ProductItem.query().where(
                        'id',
                        orderItem.productItemId
                    )
                )[0]
                const productDetails = (
                    await Product.query().where(
                        'id',
                        productItemDetails.productId
                    )
                )[0]
                const priceDetails = (
                    await Price.query().where('id', productItemDetails.priceId)
                )[0]
                const loadedFlaws = await Flaw.query().where(
                    'productItemId',
                    productItemDetails.id
                )
                const flaws: Array<any> = []
                for (const flaw of loadedFlaws) {
                    flaws.push({
                        flaw: flaw.flaw,
                        severity: flaw.severityLevel,
                    })
                    console.log(flaw.severityLevel)
                }
                // const imagesGroup = (await ImagesGroup.query().where(
                //     'productItemId',
                //     productItemDetails.id
                // ))[0]

                // const imageItems: Array<any> = []

                // const imagesGroup = (
                //     await ImagesGroup.query().where(
                //         'productItemId	',
                //         productItemDetails.id
                //     )
                // )[0]

                // const loadedImageItems = await ImageItem.query().where(
                //     'imageGroupId',
                //     imagesGroup.id
                // )
                // for (const image of loadedImageItems) {
                //     imageItems.push({
                //         imagesUrl: image.imageUrl,
                //     })

                orderItems.push({
                    id: orderItem.id,
                    deviceName: productDetails.name,
                    price: priceDetails.price,
                    currency: priceDetails.currency,
                    flaws: flaws,
                    description: productItemDetails.description,
                    usedProductCondition:
                        productItemDetails.usedProductCondition,
                    isUsed: productItemDetails.usedProduct,
                    expanded: false,
                    // imageItems: imageItems,
                })
            }

            orders.push({
                id: order.id,
                customerName: customerUser.fullName,
                customerPhone: customerUser.phoneNumber,
                date: order.createdAt,
                deliveryPrice: order.deliveryPrice,
                customerImageUrl: customerUser.imageUrl,
                currency: order.currency,
                totalPrice: order.totalPrice,
                customerAddress: customerAddress.address,
                devicesNumber: orderItems.length,
                time: order.createdAt,
                orderStatus: order.status,
                orderItems: orderItems,
                sellerName: sellerUser.fullName,
                sellerAddress: sellerAddress.address,
                sellerPhoneNumber: sellerUser.phoneNumber,
            })
        }

        return inertia.render('handledOrderScreen', { orders })
    }

    public async renderFinishedOrders({ inertia, auth }) {
        // Get the currently authenticated user
        const user = await auth.use('web').authenticate()

        const loadedOrder = await user
            .related('adminOrders')
            .query()
            .whereIn('status', ['done'])

        const orders: Array<any> = []

        for (const order of loadedOrder) {
            const customerAddress = (
                await Address.query().where('userId', order.customerUserId)
            )[0]
            const customerUser = (
                await User.query().where('id', order.customerUserId)
            )[0]

            const loadedOrderItems = await OrderItem.query().where(
                'orderId',
                order.id
            )
            const sellerUser = (
                await User.query().where('id', order.sellerUserId)
            )[0]
            const sellerAddress = (
                await Address.query().where('userId', order.sellerUserId)
            )[0]
            const orderItems: Array<any> = []
            for (const orderItem of loadedOrderItems) {
                const productItemDetails = (
                    await ProductItem.query().where(
                        'id',
                        orderItem.productItemId
                    )
                )[0]
                const productDetails = (
                    await Product.query().where(
                        'id',
                        productItemDetails.productId
                    )
                )[0]
                const priceDetails = (
                    await Price.query().where('id', productItemDetails.priceId)
                )[0]
                const loadedFlaws = await Flaw.query().where(
                    'productItemId',
                    productItemDetails.id
                )
                const flaws: Array<any> = []
                for (const flaw of loadedFlaws) {
                    flaws.push({
                        flaw: flaw.flaw,
                        severity: flaw.severityLevel,
                    })
                }
                // const imagesGroup = (await ImagesGroup.query().where(
                //     'productItemId',
                //     productItemDetails.id
                // ))[0]

                // const imageItems: Array<any> = []

                // const imagesGroup = (
                //     await ImagesGroup.query().where(
                //         'productItemId	',
                //         productItemDetails.id
                //     )
                // )[0]

                // const loadedImageItems = await ImageItem.query().where(
                //     'imageGroupId',
                //     imagesGroup.id
                // )
                // for (const image of loadedImageItems) {
                //     imageItems.push({
                //         imagesUrl: image.imageUrl,
                //     })

                orderItems.push({
                    id: orderItem.id,
                    deviceName: productDetails.name,
                    price: priceDetails.price,
                    currency: priceDetails.currency,
                    deviceFlaws: flaws,
                    description: productItemDetails.description,
                    usedProductCondition:
                        productItemDetails.usedProductCondition,
                    isUsed: productItemDetails.usedProduct,
                    expanded: false,
                    // imageItems: imageItems,
                })
            }

            orders.push({
                id: order.id,
                customerName: customerUser.fullName,
                customerPhone: customerUser.phoneNumber,
                date: order.createdAt,
                deliveryPrice: order.deliveryPrice,
                customerImageUrl: customerUser.imageUrl,
                currency: order.currency,
                totalPrice: order.totalPrice,
                customerAddress: customerAddress.address,
                devicesNumber: orderItems.length,
                time: order.createdAt,
                orderStatus: order.status,
                orderItems: orderItems,
                sellerName: sellerUser.fullName,
                sellerAddress: sellerAddress.address,
                sellerPhoneNumber: sellerUser.phoneNumber,
            })
        }

        return inertia.render('orderHistoryScreen', { orders })
    }

    public async handleOrder({ params, response }) {
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
                    .json({ message: 'Invalid order states' })
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

    public async confirmOrder({ request, response }: HttpContextContract) {}

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
