import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/:productId',
        'ProductItems/CustomerProductItemsController.getProductItems'
    )

    Route.get(
        '/recently-added-product-items',
        'ProductItems/CustomerProductItemsController.getRecentlyAddedProductItems'
    )

    Route.get(
        '/high-rated-product-items',
        'ProductItems/CustomerProductItemsController.getHighRatedProductItems'
    )
})
    .prefix('api/product-items')
    .middleware('auth:api')
