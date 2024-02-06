import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellerProductsController {
    public async getProducts({ response, auth }) {
        try {
            // Get the currently authenticated user
            const user = await auth.use('api').authenticate()

            // Fetch only the product items that belong to the authenticated user
            const productItems = await user
                .related('productItems')
                .query()
                .preload('product') // Use preload to fetch related products
                .distinct('product_id') // Use distinct so as not to get all the product items of each product, and only get one

            // Use a Set to store unique products
            const uniqueProducts = new Set()

            // Iterate through product items and add products to the Set
            productItems.forEach((item) => {
                if (item.product) {
                    uniqueProducts.add(item.product)
                }
            })

            // Convert the Set back to an array
            const products = Array.from(uniqueProducts)

            return products
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: `An error has occurred!: ${err}`,
            })
        }
    }

    public async addProduct({ request, response }: HttpContextContract) {}

    public async removeProduct({ request, response }: HttpContextContract) {}
}
