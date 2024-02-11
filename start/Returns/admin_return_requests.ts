import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get(
        '/return-requests',
        'Returns/AdminReturnRequestsController.renderReturnRequests'
    )

    Route.put(
        'handle-return-request/:returnRequestId',
        'Returns/AdminReturnRequestsController.handleReturnRequest'
    )

    Route.put(
        'resolve-return-request/:returnRequestId',
        'Returns/AdminReturnRequestsController.resolveReturnRequest'
    )
})
    .prefix('returns')
    .middleware('auth:web')
