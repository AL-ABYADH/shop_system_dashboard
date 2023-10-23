// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellersAccountsScreenController {
    public index({ inertia }) {
        return inertia.render('sellersAccountsScreen')
    }
}
