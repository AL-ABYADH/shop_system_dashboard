import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/', 'Orders/AdminOrdersController.renderNewOrders')

    Route.get(
        '/handled-orders',
        'Orders/AdminOrdersController.renderHandledOrders'
    ).prefix('orders')

    Route.get(
        '/finished-orders',
        'Orders/AdminOrdersController.renderFinishedOrders'
    ).prefix('orders')

    Route.put(
        '/handle-order/:orderId',
        'Orders/AdminOrdersController.handleOrder'
    ).prefix('orders')

    Route.put(
        '/confirm-order/:orderId',
        'Orders/AdminOrdersController.confirmOrder'
    ).prefix('orders')

    Route.put(
        '/cancel-order/:orderId',
        'Orders/AdminOrdersController.cancelOrder'
    ).prefix('orders')
})
// .middleware('auth:web')
