import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Feature from 'App/Models/Feature'

export default class FeatureSeeder extends BaseSeeder {
    public async run() {
        const featureData = [
            { feature: 'ram', categoryId: 1 },
            { feature: 'avaliable ram', categoryId: 1 },
            { feature: 'storage', categoryId: 1 },
            { feature: 'avaliable storage', categoryId: 1 },
            { feature: 'cpu', categoryId: 1 },
            { feature: 'cpu level', categoryId: 1 },
            { feature: 'battery', categoryId: 1 },
            { feature: 'batery level', categoryId: 1 },
            { feature: 'camera', categoryId: 1 },
            { feature: 'camera level', categoryId: 1 },
            { feature: 'speakers level', categoryId: 1 },
            { feature: 'Matrial quality', categoryId: 1 },
            { feature: 'os version', categoryId: 1 },
            { feature: 'max os version', categoryId: 1 },
            { feature: 'water dust resistance', categoryId: 1 },
            { feature: 'budget range', categoryId: 1 },
            { feature: 'size', categoryId: 1 },
        ]

        await Feature.updateOrCreateMany(['feature', 'categoryId'], featureData)
    }
}
