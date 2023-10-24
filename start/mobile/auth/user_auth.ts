import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post(
        '/register',
        'mobile/auth/UserAuthController.register'
    ).middleware('checkUser')

    Route.post('/login', 'mobile/auth/UserAuthController.login')
}).prefix('api')
