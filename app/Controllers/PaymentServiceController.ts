// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class PaymentServiceController {
    public static async checkBalance(
        phoneNumber: string,
        currency: string
    ): Promise<number> {
        const response = await axios.get(
            `${Env.get(
                'PAYMENT_URL'
            )}/check-balance?phoneNumber=${phoneNumber}&currency=${currency}`
        )
        console.log(response)
        return 1
    }
}
