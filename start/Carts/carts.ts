import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/cart-items', 'Carts/CartsController.getCartItems')

    Route.post('/add-to-cart', 'Carts/CartsController.addToCart')

    Route.delete(
        '/remove-from-cart/:cartItemId',
        'Carts/CartsController.removeFromCart'
    )
})
    .prefix('api/carts')
    .middleware('auth:api')
