import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        'all-product-items/:productId',
        'ProductItems/CustomerProductItemsController.getAllItems'
    )

    Route.get(
        '/home-screen-items',
        'ProductItems/CustomerProductItemsController.getHomeScreenItems'
    )

    Route.get(
        '/recently-added-items',
        'ProductItems/CustomerProductItemsController.getRecentlyAddedItems'
    )

    Route.get(
        '/high-rated-items',
        'ProductItems/CustomerProductItemsController.getHighRatedItems'
    )

    Route.get(
        '/new-items',
        'ProductItems/CustomerProductItemsController.getNewItems'
    )

    Route.get(
        '/excellent-items',
        'ProductItems/CustomerProductItemsController.getExcellentItems'
    )
}).prefix('api/product-items')
// .middleware('auth:api')
