import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EditAdminsScreenController {
    public index({ inertia }) {
        return inertia.render('editAdminsScreen')
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
