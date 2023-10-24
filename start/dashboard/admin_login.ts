import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/login', 'dashboard/AdminLoginController.index')

    // User login
    Route.post('/postForm', 'dashboard/AdminLoginController.login').prefix(
        'login'
    )
})
