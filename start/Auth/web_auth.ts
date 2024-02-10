import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/login', 'Auth/WebAuthController.renderLogin')

    Route.post('/login', 'Auth/WebAuthController.login')
    // .middleware(
    //     'checkPaymentAccount'
    // )

    Route.get('/logout', 'Auth/WebAuthController.logout')
}).prefix('auth')
