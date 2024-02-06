import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/register', 'Auth/APIAuthController.register')

    Route.post('/login', 'Auth/APIAuthController.login')
})
    .prefix('api/auth')
    .middleware('checkPaymentAccount')
