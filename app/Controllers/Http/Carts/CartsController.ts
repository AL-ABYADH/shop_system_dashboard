import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CartsController {
    public async getCartItems({ request, response }: HttpContextContract) {}

    public async addToCart({ request, response }: HttpContextContract) {}

    public async removeFromCart({ request, response }: HttpContextContract) {}
}
