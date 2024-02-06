import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'Products/SellerProductsController.get')

  Route.post('/add', 'Products/SellerProductsController.add')

  Route.post('/remove', 'Products/SellerProductsController.remove')

  Route.put('/update', 'Products/SellerProductsController.update')
}).prefix('/seller/products')
