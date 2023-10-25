import Route from '@ioc:Adonis/Core/Route'

Route.get(
    '/adminsAccounts',
    'dashboard/AdminsAccountsScreenController.index'
).middleware('auth:web')
