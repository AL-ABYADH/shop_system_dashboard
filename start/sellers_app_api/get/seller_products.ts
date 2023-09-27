import Route from '@ioc:Adonis/Core/Route';

Route.get('/sellerProducts', 'sellers_app_api/get/SellerProductsController.getProducts');