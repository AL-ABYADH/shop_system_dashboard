import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import OrderItem from 'App/Models/OrderItem'
import User from 'App/Models/User'
import ProductItem from '../../../Models/ProductItem'
import Product from 'App/Models/Product'
import Price from 'App/Models/Price'
import Flaw from 'App/Models/Flaw'
import ReturnRequest from 'App/Models/ReturnRequest'
import ReturnRequestItem from 'App/Models/ReturnRequestItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import ImageItem from 'App/Models/ImageItem'
import Order from 'App/Models/Order'
import Env from '@ioc:Adonis/Core/Env'
import PaymentServiceController from 'App/Controllers/PaymentServiceController'
// import ImagesGroup from 'App/Models/ImagesGroup'
// import ImageItem from 'App/Models/ImageItem'

export default class AdminReturnRequestsController {
    public async renderReturnRequests({ inertia, auth }) {
        // Get the currently authenticated user
        const user = await auth.use('web').authenticate()

        const loadedOrders = await user
            .related('adminOrders')
            .query()
            .whereIn('status', ['returnRequest'])
        const returnRequests: Array<any> = []
        for (const order of loadedOrders) {
            const loadedReturnRequest = await ReturnRequest.query().where(
                'orderId',
                order.id
            )

            for (const returnRequest of loadedReturnRequest) {
                const customerAddress = (
                    await Address.query().where('userId', order.customerUserId)
                )[0]
                const customerUser = (
                    await User.query().where('id', order.customerUserId)
                )[0]
                const sellerUser = (
                    await User.query().where('id', order.sellerUserId)
                )[0]
                const sellerAddress = (
                    await Address.query().where('userId', order.sellerUserId)
                )[0]
                const loadedReturnRequestItems =
                    await ReturnRequestItem.query().where(
                        'returnRequestId',
                        returnRequest.id
                    )
                const returnRequestItems: Array<any> = []

                for (const returnRequestItem of loadedReturnRequestItems) {
                    const orderItem = (
                        await OrderItem.query().where(
                            'id',
                            returnRequestItem.orderItemId
                        )
                    )[0]
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
                        await Price.query().where(
                            'id',
                            productItemDetails.priceId
                        )
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

                    returnRequestItems.push({
                        id: returnRequestItem.id,
                        orderItemId: orderItem.id,
                        deviceName: productDetails.name,
                        price: priceDetails.price,
                        currency: priceDetails.currency,
                        flaws: flaws,
                        description: productItemDetails.description,
                        usedProductCondition:
                            productItemDetails.usedProductCondition,
                        isUsed: productItemDetails.usedProduct,
                        reason: returnRequestItem.reason,
                        expanded: false,
                        imageItems: imageItems,
                    })
                }
                returnRequests.push({
                    id: returnRequest.id,
                    orderId: order.id,
                    customerName: customerUser.fullName,
                    customerPhone: customerUser.phoneNumber,
                    date: order.createdAt,
                    deliveryPrice: order.deliveryPrice,
                    customerImageUrl: customerUser.imageUrl,
                    currency: order.currency,
                    totalPrice: order.totalPrice,
                    customerAddress: customerAddress.address,
                    devicesNumber: returnRequestItems.length,
                    time: order.createdAt,
                    returnRequestStatus: returnRequest.status,
                    returnRequestItems: returnRequestItems,
                    sellerName: sellerUser.fullName,
                    sellerAddress: sellerAddress.address,
                    sellerPhoneNumber: sellerUser.phoneNumber,
                })
            }
        }
        return inertia.render('returnRequestScreen', { returnRequests })
    }

    public async handleReturnRequest({ params, response }) {
        try {
            const returnRequestId = params.returnRequestId
            const returnRequest = await ReturnRequest.find(returnRequestId)

            if (!returnRequest) {
                return response
                    .status(404)
                    .json({ message: 'Return request not found' })
            }

            // Check and update the return request status based on the current status
            if (returnRequest.status === 'awaiting') {
                returnRequest.status = 'evaluating'
            } else {
                return response
                    .status(400)
                    .json({ message: 'Invalid return request status' })
            }

            await returnRequest.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating the return request status',
            })
        }
    }

    public async resolveReturnRequest({ auth, params, request, response }) {
        try {
            const returnRequestId = params.returnRequestId
            const returnRequest = await ReturnRequest.find(returnRequestId)
            if (!returnRequest) {
                return response
                    .status(404)
                    .json({ message: 'Return request not found' })
            }
            // Check the return request status
            if (returnRequest.status !== 'evaluating') {
                return response
                    .status(400)
                    .json({ message: 'Invalid return request status' })
            }

            const returnedItemIds = request.input('returnedItemIds', [])
            const returnedOrderItems: OrderItem[] = []
            const returnedProductItems: ProductItem[] = []
            for (const id of returnedItemIds) {
                const returnRequestItem = await ReturnRequestItem.find(id)
                if (!returnRequestItem)
                    return response
                        .status(404)
                        .json({ message: 'Return request item not found' })
                const orderItem = await OrderItem.find(
                    returnRequestItem.orderItemId
                )
                if (!orderItem || orderItem.orderId != returnRequest.orderId)
                    return response
                        .status(404)
                        .json({ message: 'Order item not found' })
                returnedOrderItems.push(orderItem)
                const productItem = await ProductItem.find(
                    orderItem!.productItemId
                )
                if (!productItem)
                    return response
                        .status(404)
                        .json({ message: 'Order product item not found' })
                returnedProductItems.push(productItem)
            }

            const order = await Order.find(returnRequest.orderId)
            if (!order) {
                return response
                    .status(404)
                    .json({ message: 'Return request order not found' })
            }

            const customer = await User.find(order.customerUserId)
            if (!customer) {
                return response
                    .status(404)
                    .json({ message: 'Customer not found' })
            }

            const seller = await User.find(order.sellerUserId)
            if (!seller) {
                return response
                    .status(404)
                    .json({ message: 'Seller not found' })
            }

            // Get the currently authenticated user
            const admin = await auth.use('web').authenticate()
            // const admin = (await User.find(order.adminUserId))!

            if (returnedItemIds.length !== 0) {
                // Handle the payment here after insuring the items were found and only proceed with cancelation logic if payment was successful
                const returnedOrderItemsPrices: number[] = await Promise.all(
                    returnedOrderItems.map(async (item) => item.orderItemPrice)
                )
                const totalReturnedItemsPrice: number =
                    returnedOrderItemsPrices.reduce((totalPrice, itemPrice) => {
                        return totalPrice + itemPrice
                    }, 0) // Get the total returned items price the seller took
                const returnedAdminCommission =
                    totalReturnedItemsPrice * (5 / 100) // Get the 5% the admin took as commission
                const returnedCompanyCommission =
                    totalReturnedItemsPrice * (5 / 100) // Get the 5% the company took as commission

                // Check the company's payment balance to see if it has enough money to refund customer
                const companyBalance =
                    await PaymentServiceController.checkBalance(
                        Env.get('COMPANY_PHONE_NUMBER'),
                        order.currency
                    )
                // console.log(companyBalance)
                if (companyBalance < returnedCompanyCommission) {
                    return response.status(400).json({
                        message:
                            'Failed to cancel. Company balance is less than refund amount',
                    })
                }

                // Check the seller's payment balance to see if it has enough money to refund customer
                const sellerBalance =
                    await PaymentServiceController.checkBalance(
                        seller.phoneNumber,
                        order.currency
                    )
                // console.log(sellerBalance)
                if (sellerBalance < totalReturnedItemsPrice) {
                    return response.status(400).json({
                        message:
                            'Failed to cancel. Seller balance is less than refund amount',
                    })
                }

                // Check the admin's payment balance to see if it has enough money to refund customer
                const adminBalance =
                    await PaymentServiceController.checkBalance(
                        admin.phoneNumber,
                        order.currency
                    )
                // console.log(adminBalance)
                if (adminBalance < returnedAdminCommission) {
                    return response.status(400).json({
                        message:
                            'Failed to cancel. Admin balance is less than refund amount',
                    })
                }

                await PaymentServiceController.pay({
                    from: Env.get('COMPANY_PHONE_NUMBER'),
                    to: customer.phoneNumber,
                    amount: returnedCompanyCommission,
                    currency: order.currency,
                })
                await PaymentServiceController.pay({
                    from: seller.phoneNumber,
                    to: customer.phoneNumber,
                    amount: totalReturnedItemsPrice,
                    currency: order.currency,
                })
                await PaymentServiceController.pay({
                    from: admin.phoneNumber,
                    to: customer.phoneNumber,
                    amount: returnedAdminCommission,
                    currency: order.currency,
                })

                // Set the returned product item status to returned, and order item returned to true
                for (const orderItem of returnedOrderItems) {
                    const productItem = returnedProductItems.find(
                        (item) => item.id == orderItem.productItemId
                    )
                    orderItem.returned = true
                    productItem!.status = 'returned'
                    orderItem.save()
                    productItem!.save()
                }
            }

            returnRequest.status = 'resolved'

            // Set the order status back to done
            order.status = 'done'
            order.save()

            await returnRequest.save()

            return response.status(200).json({ message: 'success' })
        } catch (error) {
            // console.log(error)
            return response.status(500).json({
                error: 'An error occurred while updating the return request status',
            })
        }
    }
}
