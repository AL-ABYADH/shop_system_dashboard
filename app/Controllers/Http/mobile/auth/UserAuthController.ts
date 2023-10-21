import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

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
                role: schema.enum(['seller', 'customer', rules.required()]),
            })

            const messages = {
                required:
                    'The {{ field }} is required to create a new account.',
                // url: 'The {{ field }} should be a valid URL.',
                enum: 'The {{ field }} should be either "seller" or "customer".',
                'username.unique': 'اسم المستخدم غير متاح',
                'username.alpha':
                    'اسم المستخدم يجب ألا يحتوي إلا حروف بدون مسافات',
                'username.maxLength':
                    'اسم المستخدم يجب أن يتكون من أقل من 20 عنصر',
                'username.minLength':
                    'اسم المستخدم يجب أن يتكون من أكثر من 4 عناصر',
                'fullName.alpha': 'الاسم الكامل يجب ألا يحتوي إلا حروف',
                'fullName.maxLength':
                    'الاسم الكامل يجب أن يتكون من أقل من 50 عنصر',
                'phoneNumber.unique': 'رقم الهاتف غير متاح',
                'password.minLength':
                    'كلمة المرور يجب أن تتكون من أكثر من 6 عناصر',
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
                role: data.role == 'seller' ? 'seller' : 'customer',
            })

            // Address.create({
            //     userId: user.id,
            //     address: data.address,
            //     latitude: data.latitude,
            //     longitude: data.longitude,
            // })

            // Attempt to authenticate the user
            const token = await auth
                .use('api')
                .attempt(data.username, data.password)

            return { ...user.serialize(), token: token.token }
        } catch (err) {
            return response.status(400).send({
                message: err.messages[0],
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
