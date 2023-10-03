import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class PaymentMethodSeeder extends BaseSeeder {
    public async run() {
        PaymentMethod.updateOrCreate(
            { method: 'virtual payment api' },
            {
                method: 'virtual payment api',
                accountNumber: 'our virtual account number',
            }
        )
    }
}
