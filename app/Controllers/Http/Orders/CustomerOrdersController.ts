import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerOrdersController {
    public async create({ request, response }: HttpContextContract) {}

    public async cancel({ request, response }: HttpContextContract) {}

    public async getOngoingOrders({ request, response }: HttpContextContract) {}

    public async getFinishedOrders({
        request,
        response,
    }: HttpContextContract) {}
}
