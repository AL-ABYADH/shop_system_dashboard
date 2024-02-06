import Route from '@ioc:Adonis/Core/Route'

Route.get('/sellers', 'UserAccounts/SellerAccountsController.renderSellers')
    .prefix('user-accounts')
    .middleware('auth:web')

Route.put(
    'warn-seller/:sellerId',
    'UserAccounts/SellerAccountsController.warnSeller'
)
    .prefix('user-accounts')
    .middleware('auth:web')

Route.delete(
    'ban-seller/:sellerId',
    'UserAccounts/SellerAccountsController.banSeller'
)
    .prefix('user-accounts')
    .middleware('auth:web')

Route.put('update-seller', 'UserAccounts/SellerAccountsController.updateSeller')
    .prefix('api/user-accounts')
    .middleware('auth:api')
