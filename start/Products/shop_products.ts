// Start by importing the necessary modules
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/search-products',
        'Products/ShopProductsController.getSearchProducts'
    )

    Route.get(
        '/filter-products',
        'Products/ShopProductsController.getFilterProducts'
    )

    Route.get(
        '/brand-products',
        'Products/ShopProductsController.getBrandProducts'
    )
}).prefix('api/products')
// .middleware('auth:api')
