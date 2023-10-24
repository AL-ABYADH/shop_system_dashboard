import Route from '@ioc:Adonis/Core/Route'

Route.get('/addAdmin', 'dashboard/NewAdminsScreenController.index')
    .prefix('adminsAccounts')
    .middleware('auth:web')
