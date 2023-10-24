import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.get('/editAdmin', 'dashboard/EditAdminsScreenController.index');
    Route.put('/postForm', 'dashboard/EditAdminsScreenController.updateAdmin').prefix('editAdmin');
    Route.delete('/deleteAdmin', 'dashboard/EditAdminsScreenController.deleteAdmin').prefix('editAdmin');
}).prefix('adminsAccounts');
