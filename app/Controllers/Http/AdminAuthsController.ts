// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import User from 'App/Models/User';

// export default class AdminAuthsController {
//     public async register({ request, response, auth}: HttpContextContract) {
//         const userSchema = schema.create({
//             phoneNumber: schema.string([rules.mobile(), rules.trim()]),
//             username: schema.string([rules.unique()])
//             password: schema.string([rules.minLength(6)]),
//         })

//         const data = await request.validate({ schema: userSchema })
//         const user = await User.create(data);
//     }

//     public async login({}: HttpContextContract) {
        
//     }

//     public async logout({ response, auth }: HttpContextContract) {
//         await auth.logout()

//         return response.redirect().toPath('/login')
//     }
// }
