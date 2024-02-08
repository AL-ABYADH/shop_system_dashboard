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
                    })}

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

    public async handleReturnRequest({
        request,
        response,
    }: HttpContextContract) {}

    public async resolveReturnRequest({
        request,
        response,
    }: HttpContextContract) {}
}
