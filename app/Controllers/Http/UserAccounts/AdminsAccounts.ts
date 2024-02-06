import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsAccounts {
    public async registerAdmin({ request, response }: HttpContextContract) {}

    public async get({ request, response }: HttpContextContract) {}

    public async update({ request, response }: HttpContextContract) {}
}
