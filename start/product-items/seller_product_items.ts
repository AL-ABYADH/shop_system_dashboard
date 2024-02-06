import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/seller-product-items',
        'ProductItems/SellerProductItemsController.getSellerProductItems'
    )

    Route.post(
        '/add-product-item',
        'ProductItems/SellerProductItemsController.addProductItem'
    )

    Route.delete(
        '/remove-product-item/:productItemId',
        'ProductItems/SellerProductItemsController.removeProductItem'
    )

    Route.put(
        '/update-product-item/:productItemId',
        'ProductItems/SellerProductItemsController.updateProductItem'
    )

    Route.put(
        '/mark-as-sold/:productItemId',
        'ProductItems/SellerProductItemsController.markAsSold'
    )
})
    .prefix('api/product-items')
    .middleware('auth:api')
