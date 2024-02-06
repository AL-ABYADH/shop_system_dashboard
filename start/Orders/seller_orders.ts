import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/ongoing-orders',
        'Orders/SellerOrdersController.getOngoingOrders'
    )

    Route.put(
        '/confirm-order/:orderId',
        'Orders/SellerOrdersController.confirmOrder'
    )

    Route.put(
        '/cancel-order/:orderId',
        'Orders/SellerOrdersController.cancelOrder'
    )
})
    .prefix('api/sellers/orders')
    .middleware('auth:api')
