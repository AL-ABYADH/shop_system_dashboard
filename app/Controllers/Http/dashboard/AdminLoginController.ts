import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminLoginController {
    public index({ inertia }) {
        return inertia.render('loginScreen')
    }

    public async login({
        request,
        response,
        session,
        auth,
    }: HttpContextContract) {
        const { username, password } = request.only(['username', 'password'])

        try {
            await auth.attempt(username, password)
        } catch (_err) {
            session.flash('errors', 'Username or password is incorrect')
            return response.redirect().back()
        }

        return response.redirect().toPath('/')
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.logout()

        return response.redirect().toPath('/login')
    }
}