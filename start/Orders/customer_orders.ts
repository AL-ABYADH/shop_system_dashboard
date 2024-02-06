import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/ongoing-orders',
        'Orders/CustomerOrdersController.getOngoingOrders'
    )

    Route.get(
        '/finished-orders',
        'Orders/CustomerOrdersController.getFinishedOrders'
    )

    Route.post('/create-order', 'Orders/CustomerOrdersController.createOrder')

    Route.put(
        '/cancel-order/:orderId',
        'Orders/CustomerOrdersController.cancelOrder'
    )
})
    .prefix('api/customers/orders')
    .middleware('auth:api')
