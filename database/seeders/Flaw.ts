import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Flaw from 'App/Models/Flaw'

export default class FlawSeeder extends BaseSeeder {
    public async run() {
        // Define sample minor flaws and severity levels
        const flaws = [
            'الشاشة بها بقع بسيطة',
            'خدش طفيف على الغطاء الخلفي',
            'تغير لون طفيف على حواف الشاشة',
            'زر الصوت يشعر بالخلل لكنه يعمل بشكل سليم',
            'تآكل تجميلي طفيف على منفذ الشحن',
        ];
        const severityLevels: (
            | 'verySlight'
            | 'slight'
            | 'noticeable'
            | 'sever'
            | 'verySever'
        )[] = ['verySlight', 'slight', 'noticeable', 'sever', 'verySever']

        // Assume there are 100 product items in the database
        const productItemsCount = 100

        // Generate random, minor flaws for each product item
        for (let i = 1; i <= productItemsCount; i++) {
            const randomFlaw = flaws[Math.floor(Math.random() * flaws.length)]
            const randomSeverity =
                severityLevels[
                    Math.floor(Math.random() * severityLevels.length)
                ]
            const randomProductItemId =
                Math.floor(Math.random() * productItemsCount) + 1 // Random product ID between 1 and 100

            await Flaw.create({
                flaw: randomFlaw,
                severityLevel: randomSeverity as
                    | 'verySlight'
                    | 'slight'
                    | 'noticeable'
                    | 'sever'
                    | 'verySever',
                productItemId: randomProductItemId,
            })
        }
    }
}
