import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feature from 'App/Models/Feature'
import Flaw from 'App/Models/Flaw'
import ImageItem from 'App/Models/ImageItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import Price from 'App/Models/Price'
import Product from 'App/Models/Product'
import ProductFeature from 'App/Models/ProductFeature'
import ProductItem from 'App/Models/ProductItem'

export default class SellerProductItemsController {
    public async getSellerProductItems({
        request,
        response,
    }: HttpContextContract) {}

    public async addProductItem({ request, response }: HttpContextContract) {}

    public async removeProductItem({
        request,
        response,
    }: HttpContextContract) {}

    public async updateProductItem({
        request,
        response,
    }: HttpContextContract) {}

    public async markAsSold({ request, response }: HttpContextContract) {}
}
