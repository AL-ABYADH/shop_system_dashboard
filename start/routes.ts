/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";
import "./sellers_app_api/seller_products";

Route.group(() => {
  // Register a new user
  Route.post("/register", "UserAuthsController.register");

  // User login
  Route.post("/login", "UserAuthsController.login");
}).prefix("api/auth");

Route.get("/exchange", "ExchangesController.index");

Route.get("/", async ({ inertia }) => {
  return inertia.render("Home");
});
