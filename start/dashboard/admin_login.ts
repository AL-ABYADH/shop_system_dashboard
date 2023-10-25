import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/login', 'dashboard/AdminLoginController.index')

    Route.post('/postForm', 'dashboard/AdminLoginController.login').prefix(
        'login'
    )

    Route.get('/logout', 'dashboard/AdminLoginController.logout')
})
