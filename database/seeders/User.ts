import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cart from 'App/Models/Cart'
import CartItem from 'App/Models/CartItem'
import ProductItem from 'App/Models/ProductItem'
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
                    phoneNumber: `77777777${i}`,
                    role: 'admin',
                    imageUrl: 'https://picsum.photos/200',
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
                    phoneNumber: `77777778${i}`,
                    role: 'seller',
                    shopOpenAt: '08:00:00',
                    shopCloseAt: '18:00:00',
                    shopCloseDays: JSON.stringify(['Friday', 'Thursday']),
                    imageUrl: 'https://picsum.photos/200',
                }
            )

            const customer = await User.updateOrCreate(
                {
                    username: `customer_user${i}`,
                },
                {
                    username: `customer_user${i}`,
                    password: 'password123',
                    fullName: `Customer User ${i}`,
                    phoneNumber: `77777788${i}`,
                    role: 'customer',
                    preferredCurrency: 'YER',
                    imageUrl: 'https://picsum.photos/200',
                }
            )
            // Create a cart for the customer user if not created yet
            const carts = await Cart.query()
                .where('customerUserId', customer.id)
                .select('id')
            if (carts.length != 0) continue
            await Cart.create({
                customerUserId: customer.id,
            })
        }
    }
}
