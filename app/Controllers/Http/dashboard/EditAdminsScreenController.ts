// import User from 'App/Models/User';
// import { schema, rules } from '@ioc:Adonis/Core/Validator';
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

// export default class EditAdminsScreenController {
//     public index({ inertia }) {
//         return inertia.render('editAdminsScreen')
//     }

//     public async updateAdmin({ request, response }: HttpContextContract) {
//         try {
//             // Validate request data using AdonisJS validation rules
//             const validationSchema = schema.create({
//                 username: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
//                 // ... add other fields to validate ...
//             });

//             const data = await request.validate({
//                 schema: validationSchema,
//             });
            
//             // Find user by ID
//             const user = await User.findOrFail(request.qs());

//             // Update only non-empty fields
//             if (data.username) user.username = data.username;
//             // ... update other fields ...

//             await user.save();

//             // Fetch updated user data from the database
//             const users = await User.all();
            
//             // Render Inertia page with updated data and set status code in response header
//             response.header('X-Inertia', true);
//             response.status(200);
//             response.json({ component: 'editAdminsScreen', props: { users }});
//         } catch (error) {
//             // console.log(error);
//             if (error.code === 'E_ROW_NOT_FOUND') {
//                 // User with the given ID does not exist
//                 response.header('X-Inertia', true);
//                 response.status(404);
//                 response.json({ component: 'editAdminsScreen', props: { error: 'User not found' } });
//             } else if (error.code === 'E_UNIQUE_VIOLATION') {
//                 // Unique constraint violation (user already exists)
//                 response.header('X-Inertia', true);
//                 response.status(400);
//                 response.json({ component: 'editAdminsScreen', props: { error: 'User already exists' } });
//             } else {
//                 // Other server errors
//                 response.header('X-Inertia', true);
//                 response.status(500);
//                 response.json({ component: 'editAdminsScreen', props: { error: 'Internal Server Error' } });
//             }
//         }
//     }
// }

import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class EditAdminsScreenController {
    public index({ inertia }) {
        return inertia.render('editAdminsScreen');
    }

    public async updateAdmin({ request, response }: HttpContextContract) {
        try {
            const validationSchema = schema.create({
                username: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
                // ... add other fields to validate ...
            });

            const data = await request.validate({
                schema: validationSchema,
            });

            const user = await User.findOrFail(request.qs().id);

            if (data.username) user.username = data.username;

            await user.save();

            const users = await User.all();

            response.header('X-Inertia', true);
            response.status(200);
            response.json({ component: 'editAdminsScreen', props: { users } });
        } catch (error) {
            if (error.code === 'E_ROW_NOT_FOUND') {
                response.header('X-Inertia', true);
                response.status(404);
                response.json({ component: 'editAdminsScreen', props: { error: 'User not found' } });
            } else if (error.code === 'E_UNIQUE_VIOLATION') {
                response.header('X-Inertia', true);
                response.status(400);
                response.json({ component: 'editAdminsScreen', props: { error: 'User already exists' } });
            } else {
                response.header('X-Inertia', true);
                response.status(500);
                response.json({ component: 'editAdminsScreen', props: { error: 'Internal Server Error' } });
            }
        }
    }

    public async deleteAdmin({ request, response }: HttpContextContract) {
        try {
            const user = await User.findOrFail(request.qs().id);
            if (user.role != 'admin') {
                return response.status(404).json({message: 'Admin not found'})
            }
            await user.softDelete();
            response.header('X-Inertia', true);
            response.status(200);
            response.json({ component: 'editAdminsScreen' });
        } catch (error) {
            response.header('X-Inertia', true);
            response.status(400);
            response.json({ component: 'editAdminsScreen', props: { error: 'Invalid user ID' } });
        }
    }
}
