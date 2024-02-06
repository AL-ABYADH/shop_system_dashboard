import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/admins', 'UserAccounts/AdminAccountsController.renderAdmins')

    Route.post(
        '/register-admin',
        'UserAccounts/AdminAccountsController.registerAdmin'
    )

    Route.put(
        '/update-admin/:adminId',
        'UserAccounts/AdminAccountsController.updateAdmin'
    )

    Route.delete(
        '/delete-admin/:adminId',
        'UserAccounts/AdminAccountsController.deleteAdmin'
    )
})
    .prefix('user-accounts')
    .middleware('auth:web')
