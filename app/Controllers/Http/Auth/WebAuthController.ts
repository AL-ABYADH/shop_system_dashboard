import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class WebAuthController {
    public renderLogin({ inertia }) {
        return inertia.render('loginScreen')
    }

    public async login({ request, response, auth }: HttpContextContract) {
        const { username, password } = request.only(['username', 'password'])
        try {
            await auth.use('web').attempt(username, password)
        } catch (err) {
            response.redirect().back()
            return response.badRequest({
                message: 'Invalid username or password',
            })
        }
        return response.redirect().toPath('/')
    }

    public async logout({ response, auth }: HttpContextContract) {
        await auth.logout()

        return response.redirect().toPath('/auth/login')
    }
}
