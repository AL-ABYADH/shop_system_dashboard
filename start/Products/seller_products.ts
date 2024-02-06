import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/seller-products',
        'Products/SellerProductsController.getSellerProducts'
    )

    Route.post('/add-product', 'Products/SellerProductsController.addProduct')

    Route.delete(
        '/remove-product',
        'Products/SellerProductsController.removeProduct'
    )
})
    .prefix('api/products')
    .middleware('auth:api')
