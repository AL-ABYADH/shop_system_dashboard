import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feature from 'App/Models/Feature'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Product from 'App/Models/Product'
import ProductFeature from 'App/Models/ProductFeature'

export default class ShopProductsController {
    public async getSearchProducts({ request, response }: HttpContextContract) {
        try {
            const queryParam = request.qs().query // Get the query parameter
            if (!queryParam) {
                response.badRequest({ message: 'Query parameter is required' })
                return
            }

            // Search for products that include the query parameter in their name
            const loadedProducts = await Product.query().where(
                'name',
                'like',
                `%${queryParam}%`
            )
            const products: Array<any> = []

            for (const product of loadedProducts) {
                const imagesGroup = await ImagesGroup.findBy(
                    'productId',
                    product.id
                )
                const imageUrls: Array<string> = []
                let primImageUrl: string | null = null

                if (imagesGroup) {
                    const imageItems = await ImageItem.query().where(
                        'imagesGroupId',
                        imagesGroup.id
                    )
                    for (const imageItem of imageItems) {
                        imageUrls.push(imageItem.imageUrl)
                        if (imageItem.isPrimary)
                            primImageUrl = imageItem.imageUrl
                    }
                }

                const loadedProductFeatures =
                    await ProductFeature.query().where('productId', product.id)
                const productFeatures: any[] = []
                for (const productFeature of loadedProductFeatures) {
                    const feature = await Feature.find(productFeature.featureId)
                    if (feature) {
                        productFeatures.push({
                            feature: feature.feature,
                            type: feature.type,
                            value: productFeature.value,
                        })
                    }
                }

                products.push({
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    imageUrl: primImageUrl,
                    imageUrls: imageUrls,
                    rating: product.rating,
                    features: productFeatures,
                })
            }

            response.ok(products)
        } catch (err) {
            console.log(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }

    public async getFilterProducts() {}

    public async getBrandProducts({ request, response }) {
        try {
            const brand = request.qs().brand
            const loadedProducts = await Product.query().where('brand', brand)
            const products: Array<any> = []

            for (const product of loadedProducts) {
                const imagesGroup = await ImagesGroup.findBy(
                    'productId',
                    product.id
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
                        if (imageItem.isPrimary)
                            primImageUrl = imageItem.imageUrl
                    }
                }

                const loadedProductFeatures =
                    await ProductFeature.query().where('productId', product.id)
                const productFeatures: any[] = []
                loadedProductFeatures.forEach(async (productFeature) => {
                    const feature = await Feature.find(productFeature.featureId)
                    productFeatures.push({
                        feature: feature?.feature,
                        type: feature?.type,
                        value: productFeature.value,
                    })
                })

                products.push({
                    id: product.id,
                    name: product.name,
                    brand: product.brand,
                    imageUrl: primImageUrl,
                    flaws: product.flaws,
                    rating: product.rating,
                    features: productFeatures,
                })
            }

            response.ok(products)
        } catch (err) {
            console.log(err)
            response.internalServerError({ message: 'An error has occurred!' })
        }
    }
}
