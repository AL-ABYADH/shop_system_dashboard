import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
    async run() {
        const productData: Object[] = []

        const ratings = [
            2.4, 4.2, 3.1, 4.1, 1.2, 4.2, 1.3, 3.2, 4.9, 4.2, 3.5, 2.7,
        ]

        const brands = ['Samsung', 'Google', 'Xiaomi']

        for (let i = 1; i <= 20; i++) {
            productData.push({
                name: `Product ${i}`,
                models: JSON.stringify([`Model A${i}`, `Model B${i}`]),
                brand: brands[Math.floor(Math.random() * brands.length)],
                flaws: JSON.stringify([`Flaw A${i}`, `Flaw B${i}`]),
                categoryId: 1,
                rating: ratings[Math.floor(Math.random() * ratings.length)], // Generates a random rating between 0 and 5
            })
        }

        // Use updateOrCreateMany to insert or update product records
        await Product.updateOrCreateMany('name', productData)
    }
}
