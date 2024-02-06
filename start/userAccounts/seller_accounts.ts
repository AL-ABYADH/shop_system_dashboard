import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/get', 'UserAccounts/SellerAccountsController.get')

  Route.put('update/:id', 'UserAccounts/SellerAccountsController.update')

  Route.post('warn/:id', 'UserAccounts/SellerAccountsController.warn')

  Route.post('ban/:id', 'UserAccounts/SellerAccountsController.ban')
}).prefix('/seller-Accounts')

