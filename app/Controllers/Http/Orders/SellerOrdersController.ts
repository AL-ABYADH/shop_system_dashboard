import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellerOrdersController {
    public async getOngoingOrders({ request, response }: HttpContextContract) {}

    public async confirm({ request, response }: HttpContextContract) {}

    public async cancel({ request, response }: HttpContextContract) {}
}
