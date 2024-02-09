// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Feature from 'App/Models/Feature'
import Flaw from 'App/Models/Flaw'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Price from 'App/Models/Price'
import Product from 'App/Models/Product'
import ProductFeature from 'App/Models/ProductFeature'
import ProductItem from 'App/Models/ProductItem'

export default class CustomerProductItemsController {
    public async getAllItems({ params, response }) {
        // console.log('test')
        try {
            const productId = params.productId

            const loadedItems = await ProductItem.query().where(
                'productId',
                productId
            )

            const items = await this.getItems(loadedItems)

            response.status(200).json(items)
        } catch (err) {
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getHomeScreenItems({ request, response }) {
        try {
            // Default values for pagination
            const page = request.input('page', 1) // Default to page 1 if not provided
            const perPage = request.input('perPage', 10) // Default to 10 items per page if not provided

            // Get recently added items
            const currentDate = new Date()
            const lastWeekDate = new Date(
                currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
            )
            const paginatedRecentlyAddedItems = await ProductItem.query()
                .where('createdAt', '>', lastWeekDate.toISOString())
                .paginate(page, perPage)
            const recentlyAddedItems = await this.getItems(
                paginatedRecentlyAddedItems.toJSON().data
            )

            // Get high rated items
            const paginatedHighRatedItems = await ProductItem.query()
                .where('productRating', '>', 4)
                .paginate(page, perPage)
            const highRatedItems = await this.getItems(
                paginatedHighRatedItems.toJSON().data
            )

            // Get new items
            const paginatedNewItems = await ProductItem.query()
                .where('usedProduct', false)
                .paginate(page, perPage)
            const newItems = await this.getItems(
                paginatedNewItems.toJSON().data
            )

            // Get excellentItems used condition
            const paginatedExcellentItems = await ProductItem.query()
                .where('usedProductCondition', 'excellent')
                .paginate(page, perPage)
            const excellentItems = await this.getItems(
                paginatedExcellentItems.toJSON().data
            )

            response.status(200).json({
                data: {
                    recentlyAddedItems: recentlyAddedItems,
                    highRatedItems: highRatedItems,
                    newItems: newItems,
                    excellentItems: excellentItems,
                },
                meta: paginatedRecentlyAddedItems.toJSON().meta, // Includes pagination info like total, perPage, currentPage
            })
        } catch (err) {
            console.error(err) // Consider logging the error for debugging
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getRecentlyAddedItems({ request, response }) {
        try {
            // Default values for pagination
            const page = request.input('page', 1) // Default to page 1 if not provided
            const perPage = request.input('perPage', 10) // Default to 10 items per page if not provided

            const currentDate = new Date()
            const lastWeekDate = new Date(
                currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
            )
            const paginatedRecentlyAddedItems = await ProductItem.query()
                .where('createdAt', '>', lastWeekDate.toISOString())
                .paginate(page, perPage)
            const recentlyAddedItems = await this.getItems(
                paginatedRecentlyAddedItems.toJSON().data
            )

            response.status(200).json({
                data: recentlyAddedItems,
                meta: paginatedRecentlyAddedItems.toJSON().meta, // Includes pagination info like total, perPage, currentPage
            })
        } catch (err) {
            console.error(err) // Consider logging the error for debugging
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getHighRatedItems({ request, response }) {
        try {
            // Default values for pagination
            const page = request.input('page', 1) // Default to page 1 if not provided
            const perPage = request.input('perPage', 10) // Default to 10 items per page if not provided

            // Get high rated items
            const paginatedHighRatedItems = await ProductItem.query()
                .where('productRating', '>', 4)
                .paginate(page, perPage)
            const highRatedItems = await this.getItems(
                paginatedHighRatedItems.toJSON().data
            )

            response.status(200).json({
                data: highRatedItems,
                meta: paginatedHighRatedItems.toJSON().meta, // Includes pagination info like total, perPage, currentPage
            })
        } catch (err) {
            console.error(err) // Consider logging the error for debugging
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getNewItems({ request, response }) {
        try {
            // Default values for pagination
            const page = request.input('page', 1) // Default to page 1 if not provided
            const perPage = request.input('perPage', 10) // Default to 10 items per page if not provided

            // Get new items
            const paginatedNewItems = await ProductItem.query()
                .where('usedProduct', false)
                .paginate(page, perPage)
            const newItems = await this.getItems(
                paginatedNewItems.toJSON().data
            )

            response.status(200).json({
                data: newItems,
                meta: paginatedNewItems.toJSON().meta, // Includes pagination info like total, perPage, currentPage
            })
        } catch (err) {
            console.error(err) // Consider logging the error for debugging
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getExcellentItems({ request, response }) {
        try {
            // Default values for pagination
            const page = request.input('page', 1) // Default to page 1 if not provided
            const perPage = request.input('perPage', 10) // Default to 10 items per page if not provided

            // Get excellentItems used condition
            const paginatedExcellentItems = await ProductItem.query()
                .where('usedProductCondition', 'excellent')
                .paginate(page, perPage)
            const excellentItems = await this.getItems(
                paginatedExcellentItems.toJSON().data
            )

            response.status(200).json({
                data: excellentItems,
                meta: paginatedExcellentItems.toJSON().meta, // Includes pagination info like total, perPage, currentPage
            })
        } catch (err) {
            console.error(err) // Consider logging the error for debugging
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    private async getItems(loadedItems: Array<ProductItem>) {
        const items: Array<any> = []

        for (const item of loadedItems) {
            const product = await Product.find(item.productId)
            const price = await Price.find(item.priceId)
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

            items.push({
                id: item.id,
                desc: item.description,
                productId: item.productId,
                productName: product?.name,
                price: price?.price,
                currency: price?.currency,
                primImageUrl: primImageUrl,
                imageUrls: imageUrls,
                rating: product?.rating,
                warrantyEndsIn: item.warrantyEndsIn,
                usedProduct: item.usedProduct,
                usedProductCondition: item.usedProductCondition,
                flaws: flaws,
                features: productFeatures,
            })
        }

        return items
    }
}
