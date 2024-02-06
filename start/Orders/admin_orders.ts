import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/new-orders', 'Orders/AdminOrdersController.getNewOrders')

  Route.get('/handled-orders', 'Orders/AdminOrdersController.getHandledOrders')

  Route.get('/finished-orders', 'Orders/AdminOrdersController.getFinishedOrders')

  Route.post('/handle', 'Orders/AdminOrdersController.handle')

  Route.post('/confirm', 'Orders/AdminOrdersController.confirm')

  Route.post('/cancel', 'Orders/AdminOrdersController.cancel')
}).prefix('/admin/orders')
