import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('/editAdmin', 'dashboard/EditAdminsScreenController.index')

    Route.post('/postForm', 'dashboard/EditAdminsScreenController.updateAdmin').prefix('editAdmin')
}).prefix('api')