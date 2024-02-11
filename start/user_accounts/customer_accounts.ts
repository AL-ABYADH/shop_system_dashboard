import Route from '@ioc:Adonis/Core/Route'

Route.get(
    '/customers',
    'UserAccounts/CustomerAccountsController.renderCustomers'
)
    .prefix('user-accounts')
    .middleware('auth:web')

Route.delete(
    '/ban-customer/:customerId',
    'UserAccounts/CustomerAccountsController.banCustomer'
)
    .prefix('user-accounts')
    .middleware('auth:web')

Route.put(
    '/update-customer',
    'UserAccounts/CustomerAccountsController.updateCustomer'
)
    .prefix('api/user-accounts')
    .middleware('auth:api')

Route.post(
    '/imageWithAddress',
    'UserAccounts/CustomerAccountsController.imageWithAddress'
)
    .prefix('api/user-accounts')
    .middleware('auth:api')
