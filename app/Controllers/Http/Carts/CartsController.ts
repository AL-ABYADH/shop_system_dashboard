// CartsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExchangesController from 'App/Controllers/ExchangesController'
import Cart from 'App/Models/Cart'
import CartItem from 'App/Models/CartItem'
import Feature from 'App/Models/Feature'
import Flaw from 'App/Models/Flaw'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Price from 'App/Models/Price'
import Product from 'App/Models/Product'
import ProductFeature from 'App/Models/ProductFeature'
import ProductItem from 'App/Models/ProductItem'
import User from 'App/Models/User'
// import User from 'App/Models/User'

export default class CartsController {
    public async getCartItems({ auth, response }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            // const customer = await auth.use('api').authenticate()
            const customer = await User.find(3)

            const cart = await Cart.query()
                .where('customerUserId', customer!.id)
                .select('id')
                .first()

            if (!cart) {
                return response.notFound({ message: 'Cart not found' })
            }

            const cartItems = await CartItem.query().where('cartId', cart.id)

            const loadedItems = await ProductItem.query().whereIn(
                'id',
                cartItems.map((item) => item.productItemId)
            )

            if (loadedItems.length == 0) return response.ok([])

            const seller = await User.find(loadedItems[0].sellerUserId)
            if (!seller)
                return response.notFound({ message: 'Seller not found' })

            const items = await this.getItems(
                loadedItems,
                customer?.preferredCurrency!,
                seller?.fullName
            )

            response.ok(items)
        } catch (error) {
            // console.error(error)
            return response.internalServerError({
                message: 'An error occurred while getting items',
            })
        }
    }

    public async addToCart({ auth, request, response }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            const customer = await auth.use('api').authenticate()
            // const customer = await User.find(3)

            const { productItemId } = request.only(['productItemId'])

            // Check if a product item with the provided id exists and its status is available
            const productItem = await ProductItem.find(productItemId)
            if (!productItem)
                return response.notFound({ message: 'Product item not found' })
            if (productItem.status != 'available')
                return response.forbidden({
                    message: 'Product item is not for sale',
                })

            const cart = await Cart.query()
                .where('customerUserId', customer!.id)
                .select('id')
                .firstOrFail()

            const cartItem = await CartItem.findBy(
                'productItemId',
                productItemId
            )
            if (cartItem)
                return response.badRequest({ message: 'Item already in cart' })

            await CartItem.create({
                cartId: cart.id,
                productItemId: productItemId,
            })

            return response.ok({ message: 'success' })
        } catch (error) {
            console.log(error)
            return response.internalServerError({
                message: 'An error has occurred while adding item to cart',
            })
        }
    }

    public async removeFromCart({
        auth,
        params,
        response,
    }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            const customer = await auth.use('api').authenticate()

            const { productItemId } = params

            const cart = await Cart.findBy('customerUserId', customer.id)
            if (!cart) return response.notFound('Cart not found')

            const cartItem = await CartItem.findBy(
                'productItemId',
                productItemId
            )
            if (!cartItem)
                return response.notFound({ message: 'Cart item not found' })

            await cartItem.softDelete()
            return response.ok({ message: 'success' })
        } catch (error) {
            console.log(error)
            return response.internalServerError({
                message: 'An error has occurred while removing item from cart',
            })
        }
    }

    private async getItems(
        loadedItems: Array<ProductItem>,
        preferredCurrency: 'YER' | 'SAR' | 'USD',
        seller: string
    ) {
        const items: Array<any> = []
        const exchangeRates = await ExchangesController.getExchanges()

        for (const item of loadedItems) {
            const product = await Product.find(item.productId)
            const price = (await Price.find(item.priceId))!
            const imagesGroup = await ImagesGroup.findBy(
                'productItemId',
                item.id
            )
            const imageUrls: Array<string> = []
            let primImageUrl: string | null = null

            if (imagesGroup) {
                const imageItems = await ImageItem.query().where(
                    'imagesGroupId',
                    imagesGroup?.id
                )
                for (const imageItem of imageItems) {
                    imageUrls.push(imageItem.imageUrl)
                    if (imageItem.isPrimary) primImageUrl = imageItem.imageUrl
                }
            }

            const loadedFlaws = await Flaw.query().where(
                'productItemId',
                item.id
            )
            const flaws: any[] = []
            loadedFlaws.forEach((flaw) =>
                flaws.push({
                    flaw: flaw.flaw,
                    severityLevel: flaw.severityLevel,
                })
            )

            const loadedProductFeatures = await ProductFeature.query().where(
                'productItemId',
                item.id
            )
            const productFeatures: any[] = []
            loadedProductFeatures.forEach(async (productFeature) => {
                const feature = await Feature.find(productFeature.featureId)
                productFeatures.push({
                    feature: feature?.feature,
                    type: feature?.type,
                    value: productFeature.value,
                })
            })

            // Check if the product item's price currency is not equal to the customer's preferred currency to convert it accordingly
            let productItemPrice: number = price.price

            // Check if the product item's price currency is not equal to the customer's preferred currency to convert it accordingly
            if (price.currency != preferredCurrency) {
                if (price.currency == 'USD' && preferredCurrency == 'YER') {
                    // Convert from USD to YER
                    productItemPrice =
                        price.price * Number(exchangeRates['USD'])
                } else if (
                    price.currency == 'USD' &&
                    preferredCurrency == 'SAR'
                ) {
                    // Convert from USD to SAR (First convert USD to YER then YER to SAR)
                    const usdToYer = price.price * Number(exchangeRates['USD'])
                    productItemPrice = usdToYer / Number(exchangeRates['SAR'])
                } else if (
                    price.currency == 'SAR' &&
                    preferredCurrency == 'YER'
                ) {
                    // Convert from SAR to YER
                    productItemPrice =
                        price.price * Number(exchangeRates['SAR'])
                } else if (
                    price.currency == 'SAR' &&
                    preferredCurrency == 'USD'
                ) {
                    // Convert from SAR to USD (First convert SAR to YER then YER to USD)
                    const sarToYer = price.price * Number(exchangeRates['SAR'])
                    productItemPrice = sarToYer / Number(exchangeRates['USD'])
                } else if (
                    price.currency == 'YER' &&
                    preferredCurrency == 'SAR'
                ) {
                    // Convert from YER to SAR
                    productItemPrice =
                        price.price / Number(exchangeRates['SAR'])
                } else if (
                    price.currency == 'YER' &&
                    preferredCurrency == 'USD'
                ) {
                    // Convert from YER to USD
                    productItemPrice =
                        price.price / Number(exchangeRates['USD'])
                }
            }

            const cart = await CartItem.findBy('productItemId', item.id)

            items.push({
                id: item.id,
                desc: item.description,
                productId: item.productId,
                productName: product?.name,
                model: item.model,
                seller: seller,
                price: productItemPrice,
                primImageUrl: primImageUrl,
                imageUrls: imageUrls,
                rating: product?.rating,
                warrantyEndsIn: item.warrantyEndsIn,
                usedProduct: item.usedProduct,
                usedProductCondition: item.usedProductCondition,
                flaws: flaws,
                features: productFeatures,
                inCart: cart != undefined,
            })
        }

        return items
    }
}
