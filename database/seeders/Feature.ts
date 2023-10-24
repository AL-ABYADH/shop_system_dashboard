import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Feature from 'App/Models/Feature'

export default class FeatureSeeder extends BaseSeeder {
    public async run() {
        const featureData = [
            { feature: 'modelNumbers', categoryId: 1 },
            { feature: 'ram', categoryId: 1 },
            { feature: 'availableRam', categoryId: 1 },
            { feature: 'storage', categoryId: 1 },
            { feature: 'availableStorage', categoryId: 1 },
            { feature: 'cpu', categoryId: 1 },
            { feature: 'cpuLevel', categoryId: 1 },
            { feature: 'battery', categoryId: 1 },
            { feature: 'batteryLevel', categoryId: 1 },
            { feature: 'camera', categoryId: 1 },
            { feature: 'cameraLevel', categoryId: 1 },
            { feature: 'speakersLevel', categoryId: 1 },
            { feature: 'materialQuality', categoryId: 1 },
            { feature: 'maxOsVersion', categoryId: 1 },
            { feature: 'waterDustResistance', categoryId: 1 },
            { feature: 'budgetRange', categoryId: 1 },
            { feature: 'size', categoryId: 1 },
        ]

        await Feature.updateOrCreateMany(['feature', 'categoryId'], featureData)
    }
}
