import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellerOrdersController {
    public async getOngoingOrders({ request, response }: HttpContextContract) {}

    public async confirmOrder({ request, response }: HttpContextContract) {}

    public async cancelOrder({ request, response }: HttpContextContract) {}
}
