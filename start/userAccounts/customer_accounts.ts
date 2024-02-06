import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/get', 'UserAccounts/CustomerAccountsController.get')

  Route.put('/update', 'UserAccounts/CustomerAccountsController.update')
}).prefix('/customer-accounts')
