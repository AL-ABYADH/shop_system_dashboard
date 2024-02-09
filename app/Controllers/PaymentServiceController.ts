// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class PaymentServiceController {
    public static async checkBalance(
        phoneNumber: string,
        currency: string
    ): Promise<number> {
        const url = `${Env.get(
            'PAYMENT_URL'
        )}/check-balance?phoneNumber=${phoneNumber}&currency=${currency}`
        // console.log(url)
        const response = await axios.get(url)
        return response['data']['balance']
    }
}
