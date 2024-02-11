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

// import Route from '@ioc:Adonis/Core/Route'
// import Application from '@ioc:Adonis/Core/Application'

import './auth/api_auth'
import './auth/web_auth'
import './carts/carts'
import './orders/admin_orders'
import './orders/customer_orders'
import './orders/seller_orders'
import './product_items/customer_product_items'
import './product_items/seller_product_items'
import './products/seller_products'
import './products/shop_products'
import './returns/admin_return_requests'
import './returns/customer_return_requests'
import './user_accounts/admin_accounts'
import './user_accounts/customer_accounts'
import './user_accounts/seller_accounts'

// Route.post('upload', async ({ request, response }) => {
//     const image = request.file('image', {
//         size: '2mb',
//         extnames: ['jpg', 'png', 'gif'],
//     })

//     if (image && image.isValid) {
//         const fileName = `${Date.now()}-${image.clientName}`
//         await image.move(Application.tmpPath('uploads'), {
//             name: fileName,
//         })

//         // Return the URL of the stored image
//         return response.json({ url: `/uploads/${fileName}` })
//     }
// })

// Route.get('/exchange', 'ExchangesController.index')
