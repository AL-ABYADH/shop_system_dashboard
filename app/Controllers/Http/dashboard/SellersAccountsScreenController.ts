import User from "App/Models/User";
import Address from '../../../Models/Address';

export default class SellersAccountsScreenController {
    async index({ inertia }) {
        const loadedSellers = await User.query().where('role', 'seller')

        const sellers: Array<any> = []

        for (const seller of loadedSellers) {
            const address = (await Address.query().where('userId', seller.id))[0]

            sellers.push({
                id: seller.id,
                fullName: seller.fullName,
                phoneNumber: seller.phoneNumber,
                address: address.address,
                warnings: seller.warningsCount,
                shopOpen: seller.shopOpenAt,
                shopClose: seller.shopCloseAt,
                closeDays: seller.shopCloseDays,
            })
        }

        return inertia.render('sellersAccountsScreen', { sellers })
    }
}
