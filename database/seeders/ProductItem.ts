import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
import ProductItem from 'App/Models/ProductItem'

export default class ProductItemSeeder extends BaseSeeder {
    public async run() {
        // Fetch all products
        const products = await Product.all()

        // Define an array to store product items
        const productItems: Object[] = []

        // Define an array to store seller ids
        const sellerUserIds: number[] = [2, 5, 8, 11, 14]

        let itemId = 1

        // Iterate through each product and create 5 product items for each
        products.forEach((product) => {
            let priceId = 1
            for (let i = 1; i <= 5; i++) {
                productItems.push({
                    id: itemId,
                    description: `Product ${product.id} Item ${i}`,
                    productId: product.id,
                    model: `Model A${i}`,
                    userId: sellerUserIds[i - 1],
                    priceId: priceId,
                    warrantyEndsIn: 365,
                    usedProduct: true,
                    usedProductCondition: 'excellent',
                })
                priceId++
                itemId++
            }
        })

        // Use createOrUpdateMany to insert or update product item records
        await ProductItem.updateOrCreateMany('id', productItems)
    }
}
