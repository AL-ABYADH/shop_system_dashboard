// CartsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import CartItem from 'App/Models/CartItem'
import ProductItem from 'App/Models/ProductItem'
// import User from 'App/Models/User'

export default class CartsController {
    public async getCartItems({ auth, response }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            const customer = await auth.use('api').authenticate()
            // const customer = await User.find(3)

            const cart = await Cart.query()
                .where('customerId', customer!.id)
                .select('id')
                .first()

            if (!cart) {
                return response.notFound({ message: 'Cart not found' })
            }

            const cartItems = await CartItem.query().where('cartId', cart.id)
            response.ok(cartItems)
        } catch (error) {
            console.error(error)
            return response.internalServerError({
                message: 'Unable to get items',
            })
        }
    }

    public async addToCart({ auth, request, response }: HttpContextContract) {
        try {
            // Get the currently authenticated user
            const customer = await auth.use('api').authenticate()
            // const customer = await User.find(3)

            const { productItemId } = request.only(['productItemId'])

            // Check if a product item with the provided id exists and its status is available
            const productItem = await ProductItem.find(productItemId)
            if (!productItem)
                return response.notFound({ message: 'Product item not found' })
            if (productItem.status != 'available')
                return response.forbidden({
                    message: 'Product item is not for sale',
                })

            const cart = await Cart.query()
                .where('customerId', customer!.id)
                .select('id')
                .firstOrFail()

            await CartItem.create({
                cartId: cart.id,
                productItemId: productItemId,
            })

            return response.ok({ message: 'success' })
        } catch (error) {
            return response.internalServerError({
                message: 'An error has occurred while adding item to cart',
            })
        }
    }

    public async removeFromCart({ params, response }: HttpContextContract) {
        try {
            const { cartItemId } = params

            const cart = await Cart.find(cartItemId)
            if (!cart) return response.notFound('Cart not found')

            const cartItem = await CartItem.find(cartItemId)
            if (!cartItem)
                return response.notFound({ message: 'Cart item not found' })

            await cartItem.softDelete()
            return response.ok({ message: 'success' })
        } catch (error) {
            console.log(error)
            return response.internalServerError({
                message: 'An error has occurred while removing item from cart',
            })
        }
    }
}
