import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/brandProducts',
        'mobile/customers_app_api/ProductsController.getBrandProducts'
    )
}).prefix('api')
// .middleware('auth:api')
