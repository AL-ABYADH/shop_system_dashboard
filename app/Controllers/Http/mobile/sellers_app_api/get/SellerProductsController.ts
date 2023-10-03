import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

// import Product from "App/Models/Product";

export default class SellerProductsController {
    public async getProducts({ response }: HttpContextContract) {
        try {
            const products = await Database.from('products').select('*')

            return response.status(200).json(products)
        } catch (err) {
            return response.status(400).json({
                status: 'error',
                message: 'An error has occurred!',
            })
        }
    }
}
