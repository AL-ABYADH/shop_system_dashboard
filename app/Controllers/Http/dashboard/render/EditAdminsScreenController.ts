// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditAdminsScreenController {
    public index({ inertia }) {
        return inertia.render('editAdminsScreen')
    }
}
