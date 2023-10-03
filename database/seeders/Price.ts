import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Price from 'App/Models/Price'

export default class PriceSeeder extends BaseSeeder {
    async run() {
        const priceData = [
            { price: 10.99, currency: 'YER' as const },
            { price: 19.99, currency: 'USD' as const },
            { price: 15.49, currency: 'SAR' as const },
            { price: 7.99, currency: 'USD' as const },
            { price: 8.49, currency: 'YER' as const },
            { price: 12.79, currency: 'SAR' as const },
            { price: 6.99, currency: 'USD' as const },
            { price: 9.29, currency: 'YER' as const },
            { price: 14.99, currency: 'SAR' as const },
            { price: 4.99, currency: 'USD' as const },
            { price: 7.49, currency: 'YER' as const },
            { price: 11.59, currency: 'SAR' as const },
            { price: 5.99, currency: 'USD' as const },
            { price: 8.79, currency: 'YER' as const },
            { price: 13.49, currency: 'SAR' as const },
            { price: 8.99, currency: 'USD' as const },
            { price: 9.99, currency: 'YER' as const },
            { price: 16.29, currency: 'SAR' as const },
            { price: 11.49, currency: 'USD' as const },
            { price: 10.79, currency: 'YER' as const },
        ]

        await Price.updateOrCreateMany(['price', 'currency'], priceData)
    }
}
