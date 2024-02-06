import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminOrdersController {
    public async getNewOrders({ request, response }: HttpContextContract) {}

    public async getHandledOrders({ request, response }: HttpContextContract) {}

    public async getFinishedOrders({
        request,
        response,
    }: HttpContextContract) {}

    public async haldle({ request, response }: HttpContextContract) {}

    public async confirm({ request, response }: HttpContextContract) {}

    public async cancel({ request, response }: HttpContextContract) {}
}
