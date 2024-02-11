import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'

export default class CheckUser {
    async handle(
        { request, response }: HttpContextContract,
        next: () => Promise<void>
    ) {
        try {
            const username = request.input('username')
            const phoneNumber = (
                await User.query().where('username', username)
            )[0].phoneNumber

            // console.log(phoneNumber)

            await axios.get(
                `${Env.get(
                    'PAYMENT_URL'
                )}/check-payment-account?phoneNumber=${phoneNumber}`
            )
            await next()
        } catch (err) {
            if (err.response && err.response.status == 404)
                return response.badRequest({
                    message: 'يجب أن يكون لديك حساب في نظام الدفع',
                })

            return response
                .status(err.response?.status || 500)
                .json({ message: 'An error has occurred!' })
        }
    }
}
