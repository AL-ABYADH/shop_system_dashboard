import Route from '@ioc:Adonis/Core/Route'

Route.get(
    '/customersAccounts',
    'dashboard/CustomersAccountsScreenController.index'
)
