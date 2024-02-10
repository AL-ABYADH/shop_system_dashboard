import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Address from 'App/Models/Address'
import OrderItem from 'App/Models/OrderItem'
import User from 'App/Models/User'
import ProductItem from '../../../Models/ProductItem'
import Product from 'App/Models/Product'
import Price from 'App/Models/Price'
import Flaw from 'App/Models/Flaw'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Env from '@ioc:Adonis/Core/Env'
import PaymentServiceController from 'App/Controllers/PaymentServiceController'
// import ImagesGroup from 'App/Models/ImagesGroup'
// import ImageItem from 'App/Models/ImageItem'

export default class AdminOrdersController {
    public async renderNewOrders({ inertia }) {
        const loadedOrders = await Order.query().whereIn('status', [
            'awaiting',
            'confirmed',
        ])

        const orders: Array<any> = []

        for (const order of loadedOrders) {
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

                const imageItems: Array<any> = []

                const imagesGroup = (
                    await ImagesGroup.query().where(
                        'productItemId',
                        productItemDetails.id
                    )
                )[0]

                const loadedImageItems = await ImageItem.query().where(
                    'imagesGroupId',
                    imagesGroup.id
                )
                for (const image of loadedImageItems) {
                    imageItems.push({
                        imageUrl: image.imageUrl,
                    })
                }

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
                    imageItems: imageItems,
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

        const loadedOrders = await user
            .related('adminOrders')
            .query()
            .whereIn('status', ['confirming', 'testing'])

        const orders: Array<any> = []

        for (const order of loadedOrders) {
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
                const imageItems: Array<any> = []

                const imagesGroup = (
                    await ImagesGroup.query().where(
                        'productItemId',
                        productItemDetails.id
                    )
                )[0]

                const loadedImageItems = await ImageItem.query().where(
                    'imagesGroupId',
                    imagesGroup.id
                )
                for (const image of loadedImageItems) {
                    imageItems.push({
                        imageUrl: image.imageUrl,
                    })
                }

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
                    imageItems: imageItems,
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

        const loadedOrders = await user
            .related('adminOrders')
            .query()
            .whereIn('status', ['done'])

        const orders: Array<any> = []

        for (const order of loadedOrders) {
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
                const imageItems: Array<any> = []

                const imagesGroup = (
                    await ImagesGroup.query().where(
                        'productItemId',
                        productItemDetails.id
                    )
                )[0]

                const loadedImageItems = await ImageItem.query().where(
                    'imagesGroupId',
                    imagesGroup.id
                )
                for (const image of loadedImageItems) {
                    imageItems.push({
                        imageUrl: image.imageUrl,
                    })
                }

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
                    imageItems: imageItems,
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

    public async handleOrder({ auth, params, response }) {
        try {
            // Get the currently authenticated user
            const user = await auth.use('web').authenticate()

            const orderId = params.orderId
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

            order.adminUserId = user.id

            await order.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating order status',
            })
        }
    }

    public async confirmOrder({ params, response }: HttpContextContract) {
        try {
            const orderId = params.orderId
            const order = await Order.find(orderId)

            if (!order) {
                return response.status(404).json({ message: 'Order not found' })
            }

            // Check and update the order status based on the current status
            if (order.status === 'confirming') {
                order.status = 'testing'
            } else {
                return response
                    .status(400)
                    .json({ message: 'Invalid order states' })
            }

            await order.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating order status',
            })
        }
    }

    public async cancelOrder({ params, request, response }) {
        try {
            const orderId = params.orderId
            const order = await Order.find(orderId)

            const unavailableItemIds = request.input('unavailableItemIds', [])
            const missMatchedItemIds = request.input('missMatchedItemIds', [])
            // Check if the provided ids are valid
            for (const id of unavailableItemIds.concat(missMatchedItemIds)) {
                const orderItem = await OrderItem.find(id)
                if (!orderItem || orderItem.orderId != orderId)
                    return response
                        .status(404)
                        .json({ message: 'Order item not found' })
            }

            if (!order) {
                return response.status(404).json({ message: 'Order not found' })
            }

            // Check the company's payment balance to see if it has enough money to refund customer
            const companyBalance = await PaymentServiceController.checkBalance(
                Env.get('COMPANY_PHONE_NUMBER'),
                order.currency
            )
            // console.log(companyBalance)
            if (companyBalance < order.totalPrice) {
                return response.status(400).json({
                    message:
                        'Failed to cancel order. Company balance is less that refund amount',
                })
            }

            // Handle the payment here after insuring the items were found and only proceed with cancelation logic if payment was successful
            PaymentServiceController.pay({
                from: Env.get('COMPANY_PHONE_NUMBER'),
                to: (await User.find(order.customerUserId))!.phoneNumber,
                amount: order.totalPrice,
                currency: order.currency,
            })

            // Check and update the order status based on the current status
            if (order.status === 'confirming') {
                // Set unavailable items to sold
                for (const id of unavailableItemIds) {
                    const orderItem = await OrderItem.find(id)
                    const item = await ProductItem.find(
                        orderItem!.productItemId
                    )
                    item!.status = 'sold'
                    await item!.save()
                }

                // Set available items back to available
                const availableItems = (
                    await OrderItem.query().where('orderId', orderId)
                ).filter((item) => {
                    return !unavailableItemIds
                        .map((id) => Number(id))
                        .includes(item.id)
                })
                for (const item of availableItems) {
                    const productItem = await ProductItem.find(
                        item.productItemId
                    )
                    productItem!.status = 'available'
                    await productItem!.save()
                }

                order.status = 'canceled'
            } else if (order.status === 'testing') {
                // Delete missMatched items
                for (const id of missMatchedItemIds) {
                    const orderItem = await OrderItem.find(id)
                    const item = await ProductItem.find(
                        orderItem!.productItemId
                    )
                    item!.softDelete()
                    await item!.save()
                }

                // Set available items back to available
                const matchedItems = (
                    await OrderItem.query().where('orderId', orderId)
                ).filter((item) => {
                    return !missMatchedItemIds
                        .map((id) => Number(id))
                        .includes(item.id)
                })
                for (const item of matchedItems) {
                    const productItem = await ProductItem.find(
                        item.productItemId
                    )
                    productItem!.status = 'available'
                    await productItem!.save()
                }

                order.status = 'canceled'
            } else {
                return response
                    .status(400)
                    .json({ message: 'Invalid order states' })
            }

            await order.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating the order status',
            })
        }
    }

    public async finishOrder({ params, response }) {
        try {
            const orderId = params.orderId
            const order = await Order.find(orderId)

            if (!order) {
                return response.status(404).json({ message: 'Order not found' })
            }

            // Check the company's payment balance to see if it has enough money to refund customer
            const companyBalance = await PaymentServiceController.checkBalance(
                Env.get('COMPANY_PHONE_NUMBER'),
                order.currency
            )
            // console.log(companyBalance)
            if (companyBalance < order.totalPrice) {
                return response.status(400).json({
                    message:
                        'Failed to finish order. Company balance is less that refund amount',
                })
            }

            // Check and update the order status based on the current status
            if (order.status === 'testing') {
                // Handle the payment here after insuring the items were found and only proceed with cancelation logic if payment was successful
                PaymentServiceController.pay({
                    from: Env.get('COMPANY_PHONE_NUMBER'),
                    to: (await User.find(order.sellerUserId))!.phoneNumber,
                    amount: order.itemsPrice,
                    currency: order.currency,
                })
                PaymentServiceController.pay({
                    from: Env.get('COMPANY_PHONE_NUMBER'),
                    to: (await User.find(order.adminUserId))!.phoneNumber,
                    amount:
                        order.adminCommission +
                        (order.deliveryPrice != null ? order.deliveryPrice : 0),
                    currency: order.currency,
                })

                order.status = 'done'
            } else {
                return response
                    .status(400)
                    .json({ message: 'Invalid order states' })
            }

            // Set order items to sold
            const orderItems = await OrderItem.query().where('orderId', orderId)
            for (const orderItem of orderItems) {
                const productItem = await ProductItem.find(
                    orderItem.productItemId
                )
                productItem!.status = 'sold'
                await productItem!.save()
            }

            await order.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating the order status',
            })
        }
    }
}
