// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomerReturnRequestsController {
    public async get({ request, response }: HttpContextContract) {}

    public async requestReturn({ request, response }: HttpContextContract) {}

    public async cancel({ request, response }: HttpContextContract) {}
}
