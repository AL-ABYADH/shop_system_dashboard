import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopProductsController {
    public async getSearchProducts({
        request,
        response,
    }: HttpContextContract) {}

    public async getFilterProducts({
        request,
        response,
    }: HttpContextContract) {}

    public async getBrandProducts({ request, response }: HttpContextContract) {}
}
