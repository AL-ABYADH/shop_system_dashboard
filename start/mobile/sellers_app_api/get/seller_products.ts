import Route from '@ioc:Adonis/Core/Route'

Route.get(
    '/sellerProducts',
    'mobile/sellers_app_api/get/SellerProductsController.getProducts'
)
    .prefix('api')
    .middleware('auth:web,api')
