import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Address from '../../../Models/Address'

export default class SellerAccountsController {
    async renderSellers({ inertia }) {
        const loadedSellers = await User.query().where('role', 'seller')

        const sellers: Array<any> = []

        for (const seller of loadedSellers) {
            const warnings = await seller.related('sellerWarnings').query()

            const address = (
                await Address.query().where('userId', seller.id)
            )[0]

            sellers.push({
                id: seller.id,
                fullName: seller.fullName,
                phoneNumber: seller.phoneNumber,
                address: address.address,
                warnings: warnings.length,
                shopOpen: seller.shopOpenAt,
                shopClose: seller.shopCloseAt,
                closeDays: seller.shopCloseDays,
            })
        }

        return inertia.render('sellersAccountsScreen', { sellers })
    }

    public async updateSeller({ request, response }: HttpContextContract) {}

    public async warnSeller({ request, response }: HttpContextContract) {}

    public async banSeller({ request, response }: HttpContextContract) {}
}
