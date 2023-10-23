// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeScreenController {
    public index({ inertia }) {
        return inertia.render('homePageScreen')
    }
}
