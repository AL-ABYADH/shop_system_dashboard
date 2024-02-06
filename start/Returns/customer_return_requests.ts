import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/return-requests',
        'Returns/CustomerReturnRequestsController.getReturnRequests'
    )

    Route.post(
        '/request-return',
        'Returns/CustomerReturnRequestsController.requestReturn'
    )

    Route.delete(
        '/cancel-return-request/:returnRequestId',
        'Returns/CustomerReturnRequestsController.cancelReturnRequest'
    )
})
    .prefix('api/returns')
    .middleware('auth:api')
