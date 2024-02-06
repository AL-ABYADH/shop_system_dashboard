import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AdminAccountsController {
    public async renderAdmins({ inertia }) {
        const loadedAdmins = await User.query().where('role', 'admin')

        const admins: Array<any> = []

        for (const admin of loadedAdmins) {
            admins.push({
                id: admin.id,
                fullName: admin.fullName,
                phoneNumber: admin.phoneNumber,
            })
        }

        return inertia.render('adminsAccountsScreen', { admins })
    }

    public renderUpdateAdmin({ inertia }) {
        return inertia.render('newAdminsScreen')
    }

    public async registerAdmin({ request, response }: HttpContextContract) {
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

        await User.create({
            username: data.username,
            password: data.password,
            phoneNumber: data.phoneNumber,
            fullName: data.fullName,
            imageUrl: data.imageUrl,
            role: 'admin',
        })

        return response.status(200).json({ message: 'success' })
    }

    public async updateAdmin({ request, response }: HttpContextContract) {
        try {
            const validationSchema = schema.create({
                username: schema.string.optional({ trim: true }, [
                    rules.maxLength(255),
                ]),
                // ... add other fields to validate ...
            })

            const data = await request.validate({
                schema: validationSchema,
            })

            const user = await User.findOrFail(request.qs().id)

            if (data.username) user.username = data.username

            await user.save()

            const users = await User.all()

            response.header('X-Inertia', true)
            response.status(200)
            response.json({ component: 'editAdminsScreen', props: { users } })
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                response.header('X-Inertia', true)
                response.status(404)
                response.json({
                    component: 'editAdminsScreen',
                    props: { error: 'User not found' },
                })
            } else if (error.code === 'E_UNIQUE_VIOLATION') {
                response.header('X-Inertia', true)
                response.status(400)
                response.json({
                    component: 'editAdminsScreen',
                    props: { error: 'User already exists' },
                })
            } else {
                response.header('X-Inertia', true)
                response.status(500)
                response.json({
                    component: 'editAdminsScreen',
                    props: { error: 'Internal Server Error' },
                })
            }
        }
    }

    public async deleteAdmin({ request, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(request.qs().id)
            if (user.role != 'admin') {
                return response.status(404).json({ message: 'Admin not found' })
            }
            await user.softDelete()
            response.header('X-Inertia', true)
            response.status(200)
            response.json({ component: 'editAdminsScreen' })
        } catch (error) {
            response.header('X-Inertia', true)
            response.status(400)
            response.json({
                component: 'editAdminsScreen',
                props: { error: 'Invalid user ID' },
            })
        }
    }
}
