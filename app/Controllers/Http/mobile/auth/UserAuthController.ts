import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Address from 'App/Models/Address'

export default class UserAuthController {
    public async register({ request, response, auth }: HttpContextContract) {
        try {
            // Validate the request data
            const validationSchema = schema.create({
                username: schema.string({}, [
                    rules.required(),
                    rules.alpha(),
                    rules.minLength(4),
                    rules.maxLength(20),
                    rules.unique({ table: 'users', column: 'username' }),
                ]),
                password: schema.string({}, [
                    rules.required(),
                    rules.minLength(6),
                ]),
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
                address: schema.string({}, [
                    rules.required(),
                    rules.alpha({ allow: ['space'] }),
                    rules.maxLength(50),
                ]),
                latitude: schema.number([
                    rules.required(),
                    rules.range(-90, 90),
                ]),
                longitude: schema.number([
                    rules.required(),
                    rules.range(-180, 180),
                ]),
                role: schema.enum(['seller', 'customer', rules.required()]),
            })

            const messages = {
                required:
                    'The {{ field }} is required to create a new account.',
                minLength:
                    'The {{ field }} should be at least {{ options.minLength }} characters long.',
                maxLength:
                    'The {{ field }} should not exceed {{ options.maxLength }} characters.',
                alpha: 'The {{ field }} should only contain alphabets.',
                unique: 'The {{ field }} is already registered.',
                url: 'The {{ field }} should be a valid URL.',
                range: 'The {{ field }} should be between {{ options.range[0] }} and {{ options.range[1] }}.',
                enum: 'The {{ field }} should be either "seller" or "customer".',
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
                role: data.role == 'seller' ? 'seller' : 'customer',
            })

            Address.create({
                userId: user.id,
                address: data.address,
                latitude: data.latitude,
                longitude: data.longitude,
            })

            // Attempt to authenticate the user
            const token = await auth
                .use('api')
                .attempt(data.username, data.password)

            return { ...user.serialize(), token: token.token }
        } catch (err) {
            return response.status(400).send({
                status: 'error',
                message: 'Validation failed',
                errors: err.messages,
            })
        }
    }

    public async login({ request, response, auth }: HttpContextContract) {
        try {
            // Validate the request data
            const validationSchema = schema.create({
                username: schema.string({}, [rules.required()]),
                password: schema.string({}, [rules.required()]),
            })

            const messages = {
                required: 'The {{ field }} is required to login.',
            }

            const data = await request.validate({
                schema: validationSchema,
                messages: messages,
            })

            // Attempt to authenticate the user
            const token = await auth
                .use('api')
                .attempt(data.username, data.password)

            return response.status(200).send({
                status: 'success',
                message: 'Logged in successfully',
                token: token.toJSON(),
            })
        } catch (err) {
            return response.status(400).send({
                status: 'error',
                message: 'Invalid username or password',
            })
        }
    }
}
