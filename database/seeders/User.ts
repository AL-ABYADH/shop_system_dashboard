import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        // Create 5 users for each role
        for (let i = 0; i < 5; i++) {
            await User.updateOrCreate(
                { username: `admin_user${i}` },
                {
                    username: `admin_user${i}`,
                    password: 'password123',
                    fullName: `Admin User ${i}`,
                    phoneNumber: `admin_user${i}`,
                    role: 'admin',
                }
            )

            await User.updateOrCreate(
                {
                    username: `seller_user${i}`,
                },
                {
                    username: `seller_user${i}`,
                    password: 'password123',
                    fullName: `Seller User ${i}`,
                    phoneNumber: `seller_phone${i}`,
                    role: 'seller',
                    warningsCount: 0, // Defaults to 0 for sellers, null for others
                    shopOpenAt: '08:00:00', // Example shop open time for sellers
                    shopCloseAt: '18:00:00', // Example shop close time for sellers
                }
            )

            await User.updateOrCreate(
                {
                    username: `customer_user${i}`,
                },
                {
                    username: `customer_user${i}`,
                    password: 'password123',
                    fullName: `Customer User ${i}`,
                    phoneNumber: `customer_phone${i}`,
                    role: 'customer',
                    preferredCurrency: 'USD', // You can change the preferred currency as needed
                }
            )
        }
    }
}
