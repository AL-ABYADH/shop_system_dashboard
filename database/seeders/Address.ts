import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Address from 'App/Models/Address'

export default class AddressSeeder extends BaseSeeder {
    public async run() {
        // Define the seller and customer user IDs
        const sellerUserIds: number[] = [2, 5, 8, 11, 14]
        const customerUserIds: number[] = [3, 6, 9, 12, 15]

        // Create addresses for seller users
        await this.createAddressesForUsers(sellerUserIds, 'seller')

        // Create addresses for customer users
        await this.createAddressesForUsers(customerUserIds, 'customer')
    }

    private async createAddressesForUsers(
        userIds: number[],
        role: 'seller' | 'customer'
    ) {
        const addressData = userIds.map((userId, index) => ({
            userId: userId,
            address: `${role}_address${index}`,
            latitude: this.getRandomLatitude(),
            longitude: this.getRandomLongitude(),
        }))

        await Address.updateOrCreateMany('userId', addressData)
    }

    private getRandomLatitude() {
        // Generate a random latitude between -90 and 90 (inclusive)
        return -90 + Math.random() * 180
    }

    private getRandomLongitude() {
        // Generate a random longitude between -180 and 180 (inclusive)
        return -180 + Math.random() * 360
    }
}
