import Feature from 'App/Models/Feature'
import Flaw from 'App/Models/Flaw'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Price from 'App/Models/Price'
import Product from 'App/Models/Product'
import ProductFeature from 'App/Models/ProductFeature'
import ProductItem from 'App/Models/ProductItem'

export default class ProductItemsController {
    public async getRecentlyAddedProductItems({ response }) {
        try {
            const currentDate = new Date()
            const lastWeekDate = new Date(
                currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
            )
            const loadedItems = await ProductItem.query().where(
                'createdAt',
                '>',
                lastWeekDate.toISOString()
            )

            const items = await this.getProductItems(loadedItems)

            response.status(200).json(items)
        } catch (err) {
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getHighRatedProductItems({ response }) {
        try {
            const loadedItems = await ProductItem.all()

            const filteredItems: Array<any> = []

            for (const item of loadedItems) {
                const product = await Product.find(item.productId)
                // console.log(product && product.rating >= 4.0)
                if (product && product.rating >= 4.0) {
                    filteredItems.push(item)
                }
            }

            const items = await this.getProductItems(filteredItems)

            response.status(200).json(items)
        } catch (err) {
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    public async getBrandProductItems({ params, response }) {
        try {
            const productId = params.productId

            const loadedItems = await ProductItem.query().where(
                'productId',
                productId
            )

            const items = await this.getProductItems(loadedItems)

            response.status(200).json(items)
        } catch (err) {
            response.status(500).json({ message: 'An error has occurred!' })
        }
    }

    private async getProductItems(loadedItems: Array<ProductItem>) {
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
