import Route from '@ioc:Adonis/Core/Route'

Route.get('/orderHistory', 'dashboard/render/OrderHistoryScreenController.index')