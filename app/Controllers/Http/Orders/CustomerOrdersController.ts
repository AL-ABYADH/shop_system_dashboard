import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExchangesController from 'App/Controllers/ExchangesController'
import PaymentServiceController from 'App/Controllers/PaymentServiceController'
import Address from 'App/Models/Address'
import Cart from 'App/Models/Cart'
import CartItem from 'App/Models/CartItem'
import Order from 'App/Models/Order'
import OrderItem from 'App/Models/OrderItem'
import Price from 'App/Models/Price'
import ProductItem from 'App/Models/ProductItem'
import User from 'App/Models/User'
import Env from '@ioc:Adonis/Core/Env'

export default class CustomerOrdersController {
    public async getOngoingOrders({ auth, response }: HttpContextContract) {
        const customer = await auth.use('api').authenticate()
        // const customer = await User.find(3)

        const ongoingOrders = await Order.query()
            .where('customerUserId', customer!.id)
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
                                    'name',
                                    'rating'
                                    // 'brand',
                                    // 'models',
                                    // 'flaws'
                                )
                            })
                            .preload('flaws')
                            .preload('productFeatures')
                            .preload('price', (x) => {
                                x.select('price')
                            })
                            .preload('imagesGroup', (ImageItems) => {
                                ImageItems.preload('imageItems', (i) => {
                                    i.select('imageUrl', 'is_primary')
                                })
                            })
                    })
                    .select(
                        'id',
                        'orderId',
                        'orderItemPrice',
                        'productItemId'
                        // 'flaws',
                        // 'productFeatures'
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
            const customer = await auth.authenticate()
            // const customer = await User.find(3)

            const orders = await Order.query()
                .where('customer_user_id', customer!.id)
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
                                    i.select('imageUrl', 'is_primary')
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
                commission: order.companyCommission + order.adminCommission,
                customerAddress: order.customerAddress?.address,
                devicesNumber: order.orderItems.length,
                time: order.createdAt.toLocaleString(),
                orderStatus: order.status,
                orderItems: order.orderItems.map((item) => ({
                    id: item.id,
                    deviceName: item.productItem.product.name,
                    price: item.productItem.price.price,
                    flaws: item.productItem.flaws,
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

    public async createOrder({ auth, response }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            const customer = await auth.use('api').authenticate()
            // const customer = await User.find(3)
            if (!customer)
                return response.notFound({ message: 'User not found' })

            const cart = await Cart.findBy('customerUserId', customer!.id)
            if (!cart) return response.notFound({ message: 'Cart not found' })

            const cartItems = await CartItem.query().where('cartId', cart.id)
            if (cartItems.length == 0)
                return response.badRequest({
                    message: 'No items found in cart',
                })

            const sellerProductItems: { [key: number]: ProductItem[] } = {}

            for (const cartItem of cartItems) {
                const productItem = await ProductItem.find(
                    cartItem.productItemId
                )
                if (!productItem)
                    return response.notFound({
                        message: 'Product item not found',
                    })

                if (productItem.status != 'available')
                    return response.badRequest({
                        message: 'Product item is not available for sale',
                    })

                if (productItem.sellerUserId in sellerProductItems)
                    sellerProductItems[productItem.sellerUserId].push(
                        productItem
                    )
                else
                    sellerProductItems[productItem.sellerUserId] = [productItem]
            }

            const exchangeRates = await ExchangesController.getExchanges()

            for (let sellerUserId in sellerProductItems) {
                const customerAddressId =
                    await this.getCorrespondingCustomerAddressId(customer!.id)
                const sellerAddressId =
                    await this.getCorrespondingSellerAddressId(
                        Number(sellerUserId)
                    )

                let deliveryPrice = 1000 // In YER. Will be converted according to customer's preferred currency

                // Check if the preferred currency isn't equal to YER (the currency of the delivery pride) to convert it accordingly
                if (customer!.preferredCurrency != 'YER') {
                    deliveryPrice /= exchangeRates[customer!.preferredCurrency!]
                }

                let itemsPrice = 0

                const orderItems: Array<any> = []

                const order: {
                    status:
                        | 'awaiting'
                        | 'confirming'
                        | 'confirmed'
                        | 'testing'
                        | 'done'
                        | 'canceled'
                        | 'returnRequest'
                    [key: string]: any
                } = {
                    customerUserId: customer!.id,
                    sellerUserId: Number(sellerUserId),
                    adminUserId: null,
                    paymentMethodId: 1,
                    sellerAddressId: sellerAddressId!,
                    customerAddressId: customerAddressId!,
                    deliveryPrice: deliveryPrice,
                    totalPrice: 0,
                    itemsPrice: 0,
                    companyCommission: 0,
                    adminCommission: 0,
                    currency: customer!.preferredCurrency!,
                    status: 'awaiting',
                }

                for (let productItem of sellerProductItems[sellerUserId]) {
                    const price = (await Price.find(productItem.priceId))!
                    let orderItemPrice: number = price.price

                    // Check if the product item's price currency is not equal to the customer's preferred currency to convert it accordingly
                    if (price.currency != customer!.preferredCurrency) {
                        if (
                            price.currency == 'USD' &&
                            customer!.preferredCurrency == 'YER'
                        ) {
                            // Convert from USD to YER
                            orderItemPrice =
                                price.price * Number(exchangeRates['USD'])
                            itemsPrice += orderItemPrice
                        } else if (
                            price.currency == 'USD' &&
                            customer!.preferredCurrency == 'SAR'
                        ) {
                            // Convert from USD to SAR (First convert USD to YER then YER to SAR)
                            const usdToYer =
                                price.price * Number(exchangeRates['USD'])
                            orderItemPrice =
                                usdToYer / Number(exchangeRates['SAR'])
                            itemsPrice += orderItemPrice
                        } else if (
                            price.currency == 'SAR' &&
                            customer!.preferredCurrency == 'YER'
                        ) {
                            // Convert from SAR to YER
                            orderItemPrice =
                                price.price * Number(exchangeRates['SAR'])
                            itemsPrice += orderItemPrice
                        } else if (
                            price.currency == 'SAR' &&
                            customer!.preferredCurrency == 'USD'
                        ) {
                            // Convert from SAR to USD (First convert SAR to YER then YER to USD)
                            const sarToYer =
                                price.price * Number(exchangeRates['SAR'])
                            orderItemPrice =
                                sarToYer / Number(exchangeRates['USD'])
                            itemsPrice += orderItemPrice
                        } else if (
                            price.currency == 'YER' &&
                            customer!.preferredCurrency == 'SAR'
                        ) {
                            // Convert from YER to SAR
                            orderItemPrice =
                                price.price / Number(exchangeRates['SAR'])
                            itemsPrice += orderItemPrice
                        } else if (
                            price.currency == 'YER' &&
                            customer!.preferredCurrency == 'USD'
                        ) {
                            // Convert from YER to USD
                            orderItemPrice =
                                price.price / Number(exchangeRates['USD'])
                            itemsPrice += orderItemPrice
                        }
                    } else itemsPrice += orderItemPrice

                    const companyCommission = itemsPrice * (5 / 100) // 5% of the total items price goes for the company
                    const adminCommission = itemsPrice * (5 / 100) // 5% of the total items price goes for the admin

                    // Check the customer's payment balance to see if it has enough money for order
                    const customerBalance =
                        await PaymentServiceController.checkBalance(
                            customer.phoneNumber,
                            customer.preferredCurrency!
                        )
                    // console.log(customerBalance)
                    if (
                        customerBalance <
                        deliveryPrice +
                            itemsPrice +
                            companyCommission +
                            adminCommission
                    ) {
                        return response.badRequest({
                            message:
                                'لا يوجد لديك رصيد كاف للعملة المحددة في حسابك',
                        })
                    }
                    await PaymentServiceController.pay({
                        from: customer.phoneNumber,
                        to: Env.get('COMPANY_PHONE_NUMBER'),
                        amount:
                            deliveryPrice +
                            itemsPrice +
                            companyCommission +
                            adminCommission,
                        currency: customer.preferredCurrency!,
                    })

                    const createdOrder = await Order.create(order)

                    orderItems.push({
                        orderId: createdOrder.id,
                        productItemId: productItem.id,
                        orderItemPrice: orderItemPrice,
                    })

                    productItem.status = 'reserved'
                    productItem.save()
                    await OrderItem.createMany(orderItems)

                    for (const cartItem of cartItems) cartItem.softDelete()

                    createdOrder.totalPrice =
                        deliveryPrice +
                        itemsPrice +
                        companyCommission +
                        adminCommission
                    createdOrder.itemsPrice = itemsPrice
                    createdOrder.companyCommission = companyCommission
                    createdOrder.adminCommission = adminCommission
                    createdOrder.save()
                }
            }

            return response.ok({ message: 'success' })
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

    private getCorrespondingSellerAddressId = async (
        sellerId: number
    ): Promise<number | null> => {
        const sellerAddress = await Address.query()
            .where('userId', sellerId)
            .first()
        return sellerAddress ? sellerAddress.id : null
    }

    private getCorrespondingCustomerAddressId = async (
        customerId: number
    ): Promise<number | null> => {
        const customerAddress = await Address.query()
            .where('userId', customerId)
            .first()
        return customerAddress ? customerAddress.id : null
    }
}
