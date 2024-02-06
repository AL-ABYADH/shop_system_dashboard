import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminLoginController {
    public index({ inertia }) {
        return inertia.render('loginScreen')
    }
}
