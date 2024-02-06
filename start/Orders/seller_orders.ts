import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/ongoing-orders', 'Orders/SellerOrdersController.getOngoingOrders')

  Route.post('/confirm', 'Orders/SellerOrdersController.confirm')

  Route.post('/cancel', 'Orders/SellerOrdersController.cancel')
}).prefix('/seller/orders')
