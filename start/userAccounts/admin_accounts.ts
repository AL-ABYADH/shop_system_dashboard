import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/registerAdmin', 'UserAccounts/AdminAccountsController.registerAdmin')

  Route.get('/get', 'UserAccounts/AdminAccountsController.get')

  Route.put('/:id', 'UserAccounts/AdminAccountsController.update')
}).prefix('/admin-accounts')
