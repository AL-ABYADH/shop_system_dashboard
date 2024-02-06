import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellerProductItemsController {
    public async get({ request, response }: HttpContextContract) {}

    public async add({ request, response }: HttpContextContract) {}

    public async remove({ request, response }: HttpContextContract) {}

    public async update({ request, response }: HttpContextContract) {}

    public async markAsSold({ request, response }: HttpContextContract) {}
}
