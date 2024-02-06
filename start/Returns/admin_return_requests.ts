import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/admin/return-requests', 'Returns/AdminReturnRequestsController.get')

  Route.put('/admin/return-requests/:id/handle', 'Returns/AdminReturnRequestsController.handle')

  Route.put('/admin/return-requests/:id/resolve', 'Returns/AdminReturnRequestsController.resolve')
})
