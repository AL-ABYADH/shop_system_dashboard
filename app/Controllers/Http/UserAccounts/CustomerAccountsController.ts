import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Address from 'App/Models/Address'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CustomerAccountsController {
    async renderCustomers({ inertia }) {
        const loadedCustomer = await User.query().where('role', 'customer')

        const customers: Array<any> = []

        for (const customer of loadedCustomer) {
            const address = (
                await Address.query().where('userId', customer.id)
            )[0]

            customers.push({
                id: customer.id,
                fullName: customer.fullName,
                phoneNumber: customer.phoneNumber,
                address: address.address,
            })
        }

        return inertia.render('customersAccountsScreen', { customers })
    }

    public async banCustomer({ request, response }: HttpContextContract) {}

    public async updateCustomer({ request, response }: HttpContextContract) {}

    public async imageWithAddress({
        auth,
        request,
        response,
    }: HttpContextContract) {
        const validationSchema = schema.create({
            profile_image: schema.file.optional({
                size: '20mb',
                extnames: ['jpg', 'png', 'jpeg'],
            }),
            longitude: schema.number(),
            latitude: schema.number(),
            addressText: schema.string({ trim: true }),
        })

        const validatedData = await request.validate({
            schema: validationSchema,
        })

        try {
            const user = await auth.authenticate()
            const Customer = User.find(user.id)

            if (validatedData.profile_image) {
                const imageName = `${user.id}.${validatedData.profile_image.extname}`
                await validatedData.profile_image.move(
                    Application.tmpPath(''),
                    {
                        name: imageName,
                    }
                )
                user.profileImageUrl = `/tmp/${imageName}`
                user.save()
            }

            Address.create({
                longitude: validatedData.longitude,
                latitude: validatedData.latitude,
                address: validatedData.addressText,
                userId: user.id,
            })

            await user.save()
            return response.ok({
                message: 'User and address registered successfully',
            })
        } catch (error) {
            console.error(error)
            return response.internalServerError({
                message: 'Failed to register user and address',
            })
        }
    }
}
