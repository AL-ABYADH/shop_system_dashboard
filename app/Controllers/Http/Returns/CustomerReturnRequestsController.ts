// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerReturnRequestsController {
    public async getReturnRequests({
        request,
        response,
    }: HttpContextContract) {}

    public async requestReturn({ request, response }: HttpContextContract) {}

    public async cancelReturnRequest({
        request,
        response,
    }: HttpContextContract) {}
}
