import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cart from 'App/Models/Cart'

export default class CartSeeder extends BaseSeeder {
    public async run() {
        const cartData = [
            { customerUserId: 3 },
            { customerUserId: 6 },
            { customerUserId: 9 },
            { customerUserId: 12 },
            { customerUserId: 15 },
        ]

        await Cart.updateOrCreateMany('customerUserId', cartData)
    }
}
