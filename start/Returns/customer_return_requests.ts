import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/customer/return-requests', 'Returns/CustomerReturnRequestsController.get')

  Route.post('/customer/return-requests/request', 'Returns/CustomerReturnRequestsController.requestReturn')

  Route.delete('/customer/return-requests/:id/cancel', 'Returns/CustomerReturnRequestsController.cancel')
})
