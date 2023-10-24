import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserProduct from 'App/Models/UserProduct'

export default class UserProductSeeder extends BaseSeeder {
    public async run() {
        const sellers = await User.query().where('role', 'seller')

        let objectId = 1

        const userProducts: Array<any> = []

        for (const seller of sellers) {
            for (let i = 1; i < 21; i++) {
                userProducts.push({
                    id: objectId,
                    userId: seller.id,
                    productId: i,
                })
                objectId++
            }
        }

        UserProduct.updateOrCreateMany('id', userProducts)
    }
}
