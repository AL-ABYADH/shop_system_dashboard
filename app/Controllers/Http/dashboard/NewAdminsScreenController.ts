// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NewAdminsScreenController {
    public index({ inertia }) {
        return inertia.render('newAdminsScreen')
    }
}
