import Route from '@ioc:Adonis/Core/Route'
Route.get('orders/handle/:id', 'dashboard/OrdersController.handleOrder')
Route.get(
    'orders/update/:id',
    'dashboard/OrdersController.UpdateOrderState'
)
Route.get(
    'orders/cancel/:id',
    'dashboard/OrdersController.CancelOrder'
)
