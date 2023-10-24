import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'dashboard/HomeScreenController.index').middleware('auth:web')
