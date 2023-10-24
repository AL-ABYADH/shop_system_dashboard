import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
    async run() {
        const productData: Object[] = []

        for (let i = 1; i <= 20; i++) {
            productData.push({
                name: `Product ${i}`,
                models: JSON.stringify([`Model A${i}`, `Model B${i}`]),
                brand: `Brand ${i}`,
                flaws: JSON.stringify([`Flaw A${i}`, `Flaw B${i}`]),
                categoryId: 1,
                rating: Math.floor(Math.random() * 11), // Generates a random rating between 0 and 10
            })
        }

        // Use updateOrCreateMany to insert or update product records
        await Product.updateOrCreateMany('name', productData)
    }
}
