// CartsController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import CartItem from 'App/Models/CartItem'

export default class CartsController {
    public async getCartItems({ auth, response }: HttpContextContract) {
        try {
            const user = auth.user!
            if (!user) {
                return response.status(404).send({ message: 'User not found' })
            }

            const cart = await Cart.query()
                .where('customer_id', user.id)
                .select('id')
                .first()

            if (!cart) {
                return response.status(404).send({ message: 'Cart not found' })
            }

            const cartItems = await CartItem.query().where('cart_id', cart.id)
            response.ok(cartItems)
        } catch (error) {
            console.error(error)
            return response.status(500).send({
                message: 'Unable to get items',
            })
        }
    }

    public async addToCart({ auth, request, response }: HttpContextContract) {
        try {
            const user = auth.user!
            const { productItemId } = request.only(['productItemId'])
            const cart = await Cart.query()
                .where('customer_id', user.id)
                .firstOrFail()

            const cartItem = new CartItem()
            cartItem.cartId = cart.id
            cartItem.productItemId = productItemId
            await cartItem.save()

            return response.ok({ message: 'Item added to cart' })
        } catch (error) {
            return response.status(500).send({
                message: 'Unable to add item to cart',
            })
        }
    }

    public async removeFromCart({
        auth,
        params,
        response,
    }: HttpContextContract) {
        try {
            const user = auth.user!
            const { cartItemId } = params
            const cartItem = await CartItem.query()
                .where('id', cartItemId)
                .preload('cart', (query) => {
                    query.where('customer_id', user.id)
                })
                .firstOrFail()

            if (cartItem.cart.customerId === user.id) {
                await cartItem.delete()
                return response.ok({ message: 'Item removed from cart' })
            } else {
                return response
                    .status(403)
                    .send({ message: 'Not authorized to remove this item' })
            }
        } catch (error) {
            return response.status(500).send({
                message: 'Unable to remove item from cart',
            })
        }
    }
}
