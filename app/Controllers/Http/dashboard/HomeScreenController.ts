// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Address from 'App/Models/Address'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import User from 'App/Models/User'
import ProductItem from '../../../Models/ProductItem'
import Product from 'App/Models/Product'
import Price from 'App/Models/Price'
import Flaw from 'App/Models/Flaw'
// import ImagesGroup from 'App/Models/ImagesGroup'
// import ImageItem from 'App/Models/ImageItem'

export default class HomeScreenController {
    async index({ inertia }) {
        const loadedOrder = await Order.query().where(
            'status',
            'awaiting' || 'confirmed'
        )

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
            const orderItems: Array<any> = []
            for (const orderItem of loadedOrderItems) {
                const productItemDetails = (
                    await ProductItem.query().where(
                        'id',
                        orderItem.productItemId
                    )
                )[0]
                
                const sellerUser = (
                    await User.query().where('id', productItemDetails.userId)
                )[0]
                const sellerAddress = (
                    await Address.query().where(
                        'userId',
                        productItemDetails.userId
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
                const loadedFlaw = await Flaw.query().where(
                    'productItemId',
                    productItemDetails.id
                )
                const flaws: Array<any> = []
                for (const flaw of loadedFlaw) {
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
                    sellerName: sellerUser.fullName,
                    sellerAddress: sellerAddress.address,
                    sellerPhoneNumber: sellerUser.phoneNumber,
                    price: priceDetails.price,
                    currency: priceDetails.currency,
                    deviceFlaws: flaws,
                    description: productItemDetails.description,
                    usedProductCondition:
                        productItemDetails.usedProductCondition,
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
            })
        }
        // const orders = [
        //     {
        //       id: 1,
        //       title: "حمود حمادي",
        //       address: "صنعاء - شعوب",
        //       date: "2023-10-07",
        //       imageUrl: "https://picsum.photos/200",
        //       devicesNumber: 2,
        //       phoneNumber: "770893740",
        //       time: "3:35",
        //       deliveryPrice: 2000,
        //       orderStatus: "Confirmed",
        //       devices: [
        //         {
        //           deviceName: "Samsung Galaxy S20",
        //           seller: "علي صالح",
        //           address: "صنعاء - الحصبة",
        //           phoneNumber: "771172112",
        //           productId: "ABC123",
        //           price: 10000,
        //           flaws: "شدوخ خفيفة",
        //           description: "هاتف ذو جودة عالية",
        //           isUsed: true,
        //           usedProductCondition: "كالجديد",
        //           pictureLink: "https://example.com/device1-image.jpg",
        //         },
        //         {
        //           deviceName: "iPhone 15 Pro",
        //           seller: "علي صالح",
        //           address: "صنعاء - الحصبة",
        //           phoneNumber: "771172112",
        //           productId: "XYZ789",
        //           price: 8000,
        //           flaws: "بلا مشاكل",
        //           description: "بالكرتون",
        //           isUsed: false,
        //           usedProductCondition: null,
        //           pictureLink: "https://example.com/device2-image.jpg",
        //         },
        //       ],
        //     },
        //     {
        //       id: 2,
        //       title: "حمود حمادي",
        //       address: "صنعاء - سعوان",
        //       date: "2023-10-07",
        //       imageUrl: "https://picsum.photos/200",
        //       devicesNumber: 2,
        //       phoneNumber: "770893740",
        //       time: "3:35",
        //       delivery: false,
        //       deliveryPrice: null,
        //       orderStatus: "Awating",
        //       devices: [
        //         {
        //           deviceName: "Samsung Galaxy S20",
        //           seller: "علي صالح",
        //           address: "صنعاء - الحصبة",
        //           phoneNumber: "771172112",
        //           productId: "ABC123",
        //           price: 50000,
        //           flaws: "شدوخ خفيفة",
        //           description: "هاتف ذو جودة عالية",
        //           isUsed: true,
        //           usedProductCondition: "كالجديد",
        //           pictureLink: "https://example.com/device1-image.jpg",
        //         },
        //         {
        //           deviceName: "iPhone 15 Pro",
        //           seller: "علي صالح",
        //           address: "صنعاء - الحصبة",
        //           phoneNumber: "771172112",
        //           productId: "XYZ789",
        //           price: 100000,
        //           flaws: "بلا مشاكل",
        //           description: "بالكرتون",
        //           isUsed: false,
        //           usedProductCondition: null,
        //           pictureLink: "https://example.com/device2-image.jpg",
        //         },
        //       ],
        //     },
        //   ]

        return inertia.render('homePageScreen', { orders })
    }
}
