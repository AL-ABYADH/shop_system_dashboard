import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AdminAuthController {
    public async register({ request, response, auth }: HttpContextContract) {
        const validationSchema = schema.create({
            username: schema.string({}, [
                rules.alpha(),
                rules.minLength(4),
                rules.maxLength(20),
                rules.unique({ table: 'users', column: 'username' }),
            ]),
            password: schema.string({}, [rules.required(), rules.minLength(6)]),
            phoneNumber: schema.string({}, [
                rules.required(),
                rules.unique({ table: 'users', column: 'phone_number' }),
            ]),
            fullName: schema.string({}, [
                rules.required(),
                rules.alpha({ allow: ['space'] }),
                rules.maxLength(50),
            ]),
            imageUrl: schema.string.optional({}, [rules.url()]),
        })

        const messages = {
            required: 'The {{ field }} is required to create a new account.',
            minLength:
                'The {{ field }} should be at least {{ options.minLength }} characters long.',
            maxLength:
                'The {{ field }} should not exceed {{ options.maxLength }} characters.',
            alpha: 'The {{ field }} should only contain alphabets.',
            url: 'The {{ field }} should be a valid URL.',
            'username.unique': 'Username not available',
            'phoneNumber.unique': 'Phone number already in use',
        }

        const data = await request.validate({
            schema: validationSchema,
            messages: messages,
        })

        const user = await User.create({
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            imageUrl: data.imageUrl,
            role: 'admin',
        })

        await auth.login(user)

        return response.redirect().toPath('/')
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
