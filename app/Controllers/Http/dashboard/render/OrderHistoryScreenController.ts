// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OrderHistoryScreenController {
    public index({ inertia }) {
        return inertia.render('orderHistoryScreen')
    }
}
