import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    // Register a new user
    Route.post('/register', 'mobile/auth/UserAuthController.register')

    // User login
    Route.post('/login', 'mobile/auth/UserAuthController.login')
}).prefix('api')
