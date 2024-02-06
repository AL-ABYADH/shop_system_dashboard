import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'Auth/WebAuthController.login')

  Route.post('/logout', 'Auth/WebAuthController.logout')
}).prefix('/auth')
