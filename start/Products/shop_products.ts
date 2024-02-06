// Start by importing the necessary modules
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/search', 'Products/ShopProductsController.getSearchProducts')

  Route.get('/filter', 'Products/ShopProductsController.getFilterProducts')

  Route.get('/brand', 'Products/ShopProductsController.getBrandProducts')
}).prefix('/shop/products')
