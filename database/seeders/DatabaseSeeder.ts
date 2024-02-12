import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

import UserSeeder from './User'
import AddressSeeder from './Address'
import CategorySeeder from './Category'
import ProductSeeder from './Product'
import ProductFeatureSeeder from './ProductFeature'
import FeatureSeeder from './Feature'
import PriceSeeder from './Price'
import ProductItemSeeder from './ProductItem'
import FlawSeeder from './Flaw'
import UserProductSeeder from './UserProduct'
import CartSeeder from './Cart'
import CartItemSeeder from './CartItem'
import PaymentMethodSeeder from './PaymentMethod'
import OrderSeeder from './Order'
import PaymentSeeder from './Payment'
import ReturnRequestSeeder from './ReturnRequest'

export default class DatabaseSeederSeeder extends BaseSeeder {
    public async run() {
        await new UserSeeder(this.client).run()
        await new AddressSeeder(this.client).run()
        await new CategorySeeder(this.client).run()
        await new ProductSeeder(this.client).run()
        await new FeatureSeeder(this.client).run()
        await new PriceSeeder(this.client).run()
        await new ProductItemSeeder(this.client).run()
        await new FlawSeeder(this.client).run()
        await new ProductFeatureSeeder(this.client).run()
        await new UserProductSeeder(this.client).run()
        // await new CartSeeder(this.client).run()
        await new CartItemSeeder(this.client).run()
        await new PaymentMethodSeeder(this.client).run()
        await new OrderSeeder(this.client).run()
        await new PaymentSeeder(this.client).run()
        await new ReturnRequestSeeder(this.client).run()
    }
}
