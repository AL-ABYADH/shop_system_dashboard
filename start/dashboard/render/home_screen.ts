import Route from '@ioc:Adonis/Core/Route'

Route.get('/home', 'dashboard/render/HomeScreenController.index')