// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Address from "App/Models/Address"
import Order from "App/Models/Order"
import User from "App/Models/User"

export default class HomeScreenController {
    async index({ inertia }) {
      const loadedOrder = await Order.query().where('status',('awaiting' || 'confirmed'))

        const orders: Array<any> = []

        for (const order of loadedOrder) {
            const customerAddress = (
                await Address.query().where('userId', order.customerUserId)
            )[0]
            const customerUser = (
              await User.query().where('id', order.customerUserId)
          )[0]

            orders.push({
                id: order.id,
                customerName: customerUser.fullName,
                customerPhone: customerUser.phoneNumber,
                date: order.createdAt,
                deliveryPrice: order.deliveryPrice,
                customerImage: customerUser.imageUrl,
                currency: order.currency,
                totalPrice: order.totalPrice,
                customerAddress: customerAddress.address,
                // deviceNumber : ,
                time: order.createdAt,
                orderStatus : order.status,


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

        return inertia.render('homePageScreen', {orders})
    }
}
