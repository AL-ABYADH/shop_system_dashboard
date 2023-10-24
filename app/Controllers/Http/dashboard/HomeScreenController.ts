// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeScreenController {
    async index({ inertia }) {
        const orders = [
            {
              id: 1,
              title: "حمود حمادي",
              address: "صنعاء - شعوب",
              date: "2023-10-07",
              imageUrl: "https://picsum.photos/200",
              devicesNumber: 2,
              phoneNumber: "770893740",
              time: "3:35",
              delivery: true,
              deliveryPrice: 2000,
              orderStatus: "Confirmed",
              devices: [
                {
                  deviceName: "Samsung Galaxy S20",
                  seller: "علي صالح",
                  address: "صنعاء - الحصبة",
                  phoneNumber: "771172112",
                  productId: "ABC123",
                  price: 10000,
                  flaws: "شدوخ خفيفة",
                  description: "هاتف ذو جودة عالية",
                  isUsed: true,
                  usedProductCondition: "كالجديد",
                  pictureLink: "https://example.com/device1-image.jpg",
                },
                {
                  deviceName: "iPhone 15 Pro",
                  seller: "علي صالح",
                  address: "صنعاء - الحصبة",
                  phoneNumber: "771172112",
                  productId: "XYZ789",
                  price: 8000,
                  flaws: "بلا مشاكل",
                  description: "بالكرتون",
                  isUsed: false,
                  usedProductCondition: null,
                  pictureLink: "https://example.com/device2-image.jpg",
                },
              ],
            },
            {
              id: 2,
              title: "حمود حمادي",
              address: "صنعاء - سعوان",
              date: "2023-10-07",
              imageUrl: "https://picsum.photos/200",
              devicesNumber: 2,
              phoneNumber: "770893740",
              time: "3:35",
              delivery: false,
              deliveryPrice: null,
              orderStatus: "Awating",
              devices: [
                {
                  deviceName: "Samsung Galaxy S20",
                  seller: "علي صالح",
                  address: "صنعاء - الحصبة",
                  phoneNumber: "771172112",
                  productId: "ABC123",
                  price: 50000,
                  flaws: "شدوخ خفيفة",
                  description: "هاتف ذو جودة عالية",
                  isUsed: true,
                  usedProductCondition: "كالجديد",
                  pictureLink: "https://example.com/device1-image.jpg",
                },
                {
                  deviceName: "iPhone 15 Pro",
                  seller: "علي صالح",
                  address: "صنعاء - الحصبة",
                  phoneNumber: "771172112",
                  productId: "XYZ789",
                  price: 100000,
                  flaws: "بلا مشاكل",
                  description: "بالكرتون",
                  isUsed: false,
                  usedProductCondition: null,
                  pictureLink: "https://example.com/device2-image.jpg",
                },
              ],
            },
          ]

        return inertia.render('homePageScreen', {orders})
    }
}