import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/seller/product-items', 'ProductItems/SellerProductItemsController.get')

  Route.post('/seller/product-items/add', 'ProductItems/SellerProductItemsController.add')

  Route.delete('/seller/product-items/:id/remove', 'ProductItems/SellerProductItemsController.remove')

  Route.put('/seller/product-items/:id/update', 'ProductItems/SellerProductItemsController.update')

  Route.put('/seller/product-items/:id/mark-as-sold', 'ProductItems/SellerProductItemsController.markAsSold')
})
