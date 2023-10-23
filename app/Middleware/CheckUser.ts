import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class CheckUser {
    async handle(
        { request, response }: HttpContextContract,
        next: () => Promise<void>
    ) {
        try {
            const phoneNumber = request.input('phoneNumber')

            await axios.get(
                `${Env.get('PAYMENT_URL')}/checkUser?phoneNumber=${phoneNumber}`
            )
            await next()
        } catch (err) {
            if (err.response && err.response.status == 404)
                return response.status(400).json({
                    message: 'يجب أن يكون لديك حساب في نظام الدفع',
                })

            return response
                .status(err.response?.status || 500)
                .json({ message: err.message })
        }
    }
}
