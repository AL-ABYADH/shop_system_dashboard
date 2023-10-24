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

import Route from '@ioc:Adonis/Core/Route'

// mobile
// auth
import './mobile/auth/user_auth'
// sellers_app_api
// get
import './mobile/sellers_app_api/get/seller_products'
// post

// customers_app_api
// get
// post

// dashboard
// auth
// render
import './dashboard/admin_login'
import './dashboard/home_screen'
import './dashboard/handled_order_screen'
import './dashboard/order_history_screen'
import './dashboard/admins_accounts_screen'
import './dashboard/sellers_accounts_screen'
import './dashboard/customers_accounts_screen'
import './dashboard/new_admins_screen'
import './dashboard/edit_admins_screen'
// get
// post

Route.get('/exchange', 'ExchangesController.index')
