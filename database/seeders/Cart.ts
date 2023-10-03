import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Cart from 'App/Models/Cart'

export default class CartSeeder extends BaseSeeder {
    public async run() {
        const cartData = [
            { customerId: 3 },
            { customerId: 6 },
            { customerId: 9 },
            { customerId: 12 },
            { customerId: 15 },
        ]

        await Cart.updateOrCreateMany('customerId', cartData)
    }
}
