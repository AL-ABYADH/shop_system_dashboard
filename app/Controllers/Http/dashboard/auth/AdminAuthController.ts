import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AdminAuthController {
    public async register({ request, response, auth}: HttpContextContract) {
        const userSchema = schema.create({
            username: schema.string({}, [
              rules.alpha(),
              rules.minLength(4),
              rules.maxLength(20),
              rules.unique({ table: 'users', column: 'username' }),
            ]),
            password: schema.string({}, [
              rules.minLength(8),
              rules.confirmed(),
            ]),
            phone_number: schema.string({}, [
              rules.mobile({
                locale: ['ar-OM'],
              }),
              rules.unique({ table: 'users', column: 'phone_number' }),
            ]),
            image: schema.file.optional({
              size: '2mb',
              extnames: ['jpg', 'png', 'jpeg'],
            }),
        })

        const data = await request.validate({ schema: userSchema })
        const user = await User.create(data);

        await auth.login(user)

        return response
        // .redirect().toPath('/')
    }

    public async login({ request, response, session, auth }: HttpContextContract) {
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
