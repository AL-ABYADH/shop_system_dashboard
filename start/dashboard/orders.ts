import Route from '@ioc:Adonis/Core/Route'
Route.get('orders/handle/:id', 'dashboard/OrdersController.handleOrder')
