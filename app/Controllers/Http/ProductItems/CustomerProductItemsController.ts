// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import ExchangesController from 'App/Controllers/ExchangesController'
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

export default class CustomerProductItemsController {
    public async getAllItems({ auth, params, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const productId = params.productId

            const loadedItems = await ProductItem.query()
                .where('status', 'available')
                .where('productId', productId)

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
        } catch (err) {
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getHomeScreenItems({ auth, request, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const page = request.input('page', 1)
            const perPage = request.input('perPage', 10)

            // Get recently added items
            const currentDate = new Date()
            const lastWeekDate = new Date(
                currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
            )
            const paginatedRecentlyAddedItems = await ProductItem.query()
                .where('status', 'available')
                .where('createdAt', '>', lastWeekDate.toISOString())
                .paginate(page, perPage)
            if (paginatedRecentlyAddedItems.length != 0) {
                var seller = await User.find(
                    paginatedRecentlyAddedItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const recentlyAddedItems =
                paginatedRecentlyAddedItems.length != 0
                    ? await this.getItems(
                          paginatedRecentlyAddedItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            // Get high rated items
            const paginatedHighRatedItems = await ProductItem.query()
                .where('status', 'available')
                .where('productRating', '>', 4)
                .paginate(page, perPage)
            if (paginatedHighRatedItems.length != 0) {
                var seller = await User.find(
                    paginatedHighRatedItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const highRatedItems =
                paginatedHighRatedItems.length != 0
                    ? await this.getItems(
                          paginatedHighRatedItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            // Get new items
            const paginatedNewItems = await ProductItem.query()
                .where('status', 'available')
                .where('usedProduct', false)
                .paginate(page, perPage)
            if (paginatedNewItems.length != 0) {
                var seller = await User.find(paginatedNewItems[0].sellerUserId)
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const newItems =
                paginatedNewItems.length != 0
                    ? await this.getItems(
                          paginatedNewItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            // Get excellentItems used condition
            const paginatedExcellentItems = await ProductItem.query()
                .where('status', 'available')
                .where('usedProductCondition', 'excellent')
                .paginate(page, perPage)
            if (paginatedExcellentItems.length != 0) {
                var seller = await User.find(
                    paginatedExcellentItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const excellentItems =
                paginatedExcellentItems.length != 0
                    ? await this.getItems(
                          paginatedExcellentItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            response.ok({
                data: {
                    recentlyAddedItems: recentlyAddedItems,
                    highRatedItems: highRatedItems,
                    newItems: newItems,
                    excellentItems: excellentItems,
                },
                meta: paginatedRecentlyAddedItems.toJSON().meta,
            })
        } catch (err) {
            console.error(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getRecentlyAddedItems({ auth, request, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const page = request.input('page', 1)
            const perPage = request.input('perPage', 10)

            const currentDate = new Date()
            const lastWeekDate = new Date(
                currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
            )
            const paginatedRecentlyAddedItems = await ProductItem.query()
                .where('status', 'available')
                .where('createdAt', '>', lastWeekDate.toISOString())
                .paginate(page, perPage)
            if (paginatedRecentlyAddedItems.length != 0) {
                var seller = await User.find(
                    paginatedRecentlyAddedItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const recentlyAddedItems =
                paginatedRecentlyAddedItems.length != 0
                    ? await this.getItems(
                          paginatedRecentlyAddedItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            response.ok({
                data: recentlyAddedItems,
                meta: paginatedRecentlyAddedItems.toJSON().meta,
            })
        } catch (err) {
            // console.error(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getHighRatedItems({ auth, request, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const page = request.input('page', 1)
            const perPage = request.input('perPage', 10)

            // Get high rated items
            const paginatedHighRatedItems = await ProductItem.query()
                .where('status', 'available')
                .where('productRating', '>', 4)
                .paginate(page, perPage)
            if (paginatedHighRatedItems.length != 0) {
                var seller = await User.find(
                    paginatedHighRatedItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const highRatedItems =
                paginatedHighRatedItems.length != 0
                    ? await this.getItems(
                          paginatedHighRatedItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            response.ok({
                data: highRatedItems,
                meta: paginatedHighRatedItems.toJSON().meta,
            })
        } catch (err) {
            // console.error(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getNewItems({ auth, request, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const page = request.input('page', 1)
            const perPage = request.input('perPage', 10)

            // Get new items
            const paginatedNewItems = await ProductItem.query()
                .where('status', 'available')
                .where('usedProduct', false)
                .paginate(page, perPage)
            if (paginatedNewItems.length != 0) {
                var seller = await User.find(paginatedNewItems[0].sellerUserId)
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const newItems =
                paginatedNewItems.length != 0
                    ? await this.getItems(
                          paginatedNewItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            response.ok({
                data: newItems,
                meta: paginatedNewItems.toJSON().meta,
            })
        } catch (err) {
            // console.error(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getExcellentItems({ auth, request, response }) {
        try {
            // Get the currently authenticated user
            // const customer = await auth
            //     .use('api')
            //     .authenticate()
            //     .select('preferredCurrency')
            const customer = await User.find(3)

            const page = request.input('page', 1)
            const perPage = request.input('perPage', 10)

            // Get excellentItems used condition
            const paginatedExcellentItems = await ProductItem.query()
                .where('status', 'available')
                .where('usedProductCondition', 'excellent')
                .paginate(page, perPage)
            if (paginatedExcellentItems.length != 0) {
                var seller = await User.find(
                    paginatedExcellentItems[0].sellerUserId
                )
                if (!seller)
                    return response.notFound({ message: 'Seller not found' })
            }
            const excellentItems =
                paginatedExcellentItems.length != 0
                    ? await this.getItems(
                          paginatedExcellentItems.toJSON().data,
                          customer?.preferredCurrency!,
                          seller!.fullName
                      )
                    : []

            response.ok({
                data: excellentItems,
                meta: paginatedExcellentItems.toJSON().meta,
            })
        } catch (err) {
            // console.error(err)
            response.internalServerError({ message: 'An error has occurred!' })
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
                inCart:
                    (await CartItem.findBy('productItemId', item.id)) !=
                    undefined,
            })
        }

        return items
    }
}
