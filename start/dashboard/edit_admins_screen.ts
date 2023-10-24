import Route from '@ioc:Adonis/Core/Route'

Route.get('/editAdmin', 'dashboard/EditAdminsScreenController.index').prefix(
    'adminsAccounts'
)
