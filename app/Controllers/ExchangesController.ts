// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class ExchangesController {
    public static async getExchanges() {
        try {
            const api = 'https://kuraimibank.com/api/ar/home'
            const { data } = await axios.get(api)

            const SAR = data.data.exchange_rates[0].exchange_rate[2].buy
            const USD = data.data.exchange_rates[0].exchange_rate[1].buy

            return { SAR, USD }
        } catch (error) {
            return { error: 'Failed to fetch exchange rates' }
        }
    }
}
