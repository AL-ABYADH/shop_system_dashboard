import Route from '@ioc:Adonis/Core/Route'

Route.get('/data/:phone_name', 'BingsController.processWebSocket')
