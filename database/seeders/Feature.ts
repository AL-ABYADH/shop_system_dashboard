import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Feature from 'App/Models/Feature'

export default class FeatureSeeder extends BaseSeeder {
    public async run() {
        const featureData = [
            { feature: 'RAM', categoryId: 1, main: true },
            { feature: 'storage', categoryId: 1, main: true },
            { feature: 'CPU', categoryId: 1, main: true },
            { feature: 'CPURating', categoryId: 1, main: true },
            { feature: 'GPU', categoryId: 1, main: true },
            { feature: 'GPURating', categoryId: 1, main: true },
            { feature: 'batteryCapacity', categoryId: 1, main: true },
            { feature: 'batteryRemovable', categoryId: 1, main: false },
            { feature: 'batteryRating', categoryId: 1, main: true },
            { feature: 'camera', categoryId: 1, main: false },
            { feature: 'frontCameraFeatures', categoryId: 1, main: false },
            { feature: 'backCameraFeatures', categoryId: 1, main: false },
            { feature: 'frontVideoFeatures', categoryId: 1, main: false },
            { feature: 'backVideoFeatures', categoryId: 1, main: false },
            { feature: 'cameraRating', categoryId: 1, main: false },
            { feature: 'speakersType', categoryId: 1, main: false },
            { feature: 'speakersRating', categoryId: 1, main: false },
            { feature: 'headphonesJack', categoryId: 1, main: false },
            { feature: 'materialQuality', categoryId: 1, main: false },
            { feature: 'maxOsVersion', categoryId: 1, main: false },
            { feature: 'waterDustResistance', categoryId: 1, main: false },
            { feature: 'screenSize', categoryId: 1, main: false },
            { feature: 'screenProtection', categoryId: 1, main: false },
            { feature: 'screenType', categoryId: 1, main: false },
            { feature: 'screenMaxResolution', categoryId: 1, main: false },
            { feature: 'screenRefreshRate', categoryId: 1, main: false },
            { feature: 'screenRating', categoryId: 1, main: false },
            { feature: 'dimensions', categoryId: 1, main: false },
            { feature: 'weight', categoryId: 1, main: false },
            { feature: 'SIM', categoryId: 1, main: false },
            { feature: 'SDCard', categoryId: 1, main: false },
            { feature: 'wirelessCharging', categoryId: 1, main: false },
            { feature: 'chargingSpeed', categoryId: 1, main: false },
            { feature: 'wirelessChargingSpeed', categoryId: 1, main: false },
            { feature: 'backMaterial', categoryId: 1, main: false },
            { feature: 'type-c', categoryId: 1, main: false },
            { feature: 'colors', categoryId: 1, main: false },
            { feature: 'bluetoothVersion', categoryId: 1, main: false },
            { feature: 'fingerprintType', categoryId: 1, main: false },
            { feature: 'fingerprintPosition', categoryId: 1, main: false },
            { feature: 'eyeSensor', categoryId: 1, main: false },
            { feature: 'sensors', categoryId: 1, main: false },
        ]

        await Feature.updateOrCreateMany(['feature', 'categoryId'], featureData)
    }
}
