// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminsAccountsScreenController {
    async index({ inertia }) {
        type Admin = {
            id: number
            name: string
            phone: number
            address: string
        }

        const admins: Admin[] = [
            {
                id: 1, // Unique ID
                name: 'حمود حامد',
                phone: 770893740,
                address: 'صنعاء - شعوب', // Add address field
            },
            {
                id: 2, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مديرية', // Add address field
            },
            {
                id: 3, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 4, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 5, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 6, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 7, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
            {
                id: 8, // Unique ID
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة', // Add address field
            },
        ]

        return inertia.render('adminsAccountsScreen', { admins })
    }
}