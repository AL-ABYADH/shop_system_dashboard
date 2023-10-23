// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HandledOrderScreenController {
    public index({ inertia }) {
        return inertia.render('handledOrderScreen')
    }
}
