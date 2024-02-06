import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../../Models/User'
import Address from '../../../Models/Address'

export default class CustomerAccountsController {
    async getCustomers({ inertia }) {
        const loadedCustomer = await User.query().where('role', 'customer')

        const customers: Array<any> = []

        for (const customer of loadedCustomer) {
            const address = (
                await Address.query().where('userId', customer.id)
            )[0]

            customers.push({
                id: customer.id,
                fullName: customer.fullName,
                phoneNumber: customer.phoneNumber,
                address: address.address,
            })
        }

        return inertia.render('customersAccountsScreen', { customers })
    }

    public async updateCustomer({ request, response }: HttpContextContract) {}

    public async banCustomer({ request, response }: HttpContextContract) {}
}
