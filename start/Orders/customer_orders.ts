import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/create', 'Orders/CustomerOrdersController.create')

  Route.post('/cancel', 'Orders/CustomerOrdersController.cancel')

  Route.get('/ongoing-orders', 'Orders/CustomerOrdersController.getOngoingOrders')

  Route.get('/finished-orders', 'Orders/CustomerOrdersController.getFinishedOrders')
}).prefix('/customer/orders')
