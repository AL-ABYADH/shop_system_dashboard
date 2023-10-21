import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class CheckUser {
    async handle(
        { request, response }: HttpContextContract,
        next: () => Promise<void>
    ) {
        try {
            const phoneNumber = request.input('phoneNumber')

            await axios.get(
                `http://localhost:3333/checkUser?phoneNumber=${phoneNumber}`
            )
            await next()
        } catch (error) {
            if (error.response.status == 404)
                response.status(400).json({
                    message: 'يجب أن يكون لديك حساب في نظام الدفع',
                })
            else
                response
                    .status(error.response.status || 500)
                    .json({ message: error.message })
        }
    }
}
