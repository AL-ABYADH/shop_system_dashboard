// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomersAccountsScreenController {
    public index({ inertia }) {
        return inertia.render('customersAccountsScreen')
    }
}
