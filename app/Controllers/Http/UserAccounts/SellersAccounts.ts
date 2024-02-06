import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SellersAccounts {
    public async get({ request, response }: HttpContextContract) {}

    public async update({ request, response }: HttpContextContract) {}

    public async warn({ request, response }: HttpContextContract) {}

    public async ban({ request, response }: HttpContextContract) {}
}
