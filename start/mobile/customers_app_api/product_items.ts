import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/recentlyAddedProductItems',
        'mobile/customers_app_api/ProductItemsController.getRecentlyAddedProductItems'
    )

    Route.get(
        '/highRatedProductItems',
        'mobile/customers_app_api/ProductItemsController.getHighRatedProductItems'
    )

    Route.get(
        '/brandProductItems/:productId',
        'mobile/customers_app_api/ProductItemsController.getBrandProductItems'
    )
}).prefix('api')
// .middleware('auth:api')
