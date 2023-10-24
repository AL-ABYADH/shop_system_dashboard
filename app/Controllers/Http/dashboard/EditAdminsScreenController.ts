import User from 'App/Models/User';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class EditAdminsScreenController {
    public index({ inertia }) {
        return inertia.render('editAdminsScreen')
    }
    
    public async updateAdmin({ request, inertia }) {
        console.log('does')
        // Validate request data using AdonisJS validation rules
        const validationSchema = schema.create({
            id: schema.number(),
            username: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
            fullName: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
            phoneNumber: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
            role: schema.enum.optional(['admin', 'seller', 'customer']),
            preferredCurrency: schema.enum.optional(['YER', 'USD', 'SAR']),
            imageUrl: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
            shopOpenAt: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
            shopCloseAt: schema.string.optional({ trim: true }, [rules.maxLength(255)]),
        });

        const data = await request.validate({
            schema: validationSchema,
        });

        // Find user by ID
        const user = await User.findOrFail(data.id);

        // Update only non-empty fields
        if (data.username) user.username = data.username;
        if (data.fullName) user.fullName = data.fullName;
        if (data.phoneNumber) user.phoneNumber = data.phoneNumber;
        if (data.role) user.role = data.role;
        if (data.preferredCurrency) user.preferredCurrency = data.preferredCurrency;
        if (data.imageUrl) user.imageUrl = data.imageUrl;
        if (data.shopOpenAt) user.shopOpenAt = data.shopOpenAt;
        if (data.shopCloseAt) user.shopCloseAt = data.shopCloseAt;

        await user.save();

        // Fetch updated user data from the database
        const users = await User.all();
        return inertia.render('editAdminsScreen', { users });
    }
}
