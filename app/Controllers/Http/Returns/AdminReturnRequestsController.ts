import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminReturnRequestsController {
    public async renderReturnRequests({
        request,
        response,
    }: HttpContextContract) {}

    public async handleReturnRequest({
        request,
        response,
    }: HttpContextContract) {}

    public async resolveReturnRequest({
        request,
        response,
    }: HttpContextContract) {}
}
