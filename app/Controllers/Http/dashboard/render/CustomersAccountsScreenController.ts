// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CustomersAccountsScreenController {
    async index({ inertia }) {
        const customers = [
            {
                id: 1,
                name: 'حمود حامد',
                phone: 770893740,
                address: 'صنعاء - شعوب',
                warnings: 1,
            },
            {
                id: 2,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مديرية',
                warnings: 2,
            },
            {
                id: 3,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 4,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 3,
            },
            {
                id: 5,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 6,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 7,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 2,
            },
            {
                id: 8,
                name: 'حمادي حامد',
                phone: 774546494,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 9,
                name: 'محمد أحمد',
                phone: 777777777,
                address: 'صنعاء - مدينة',
                warnings: 4,
            },
            {
                id: 10,
                name: 'أحمد محمد',
                phone: 778888888,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 11,
                name: 'علي أحمد',
                phone: 779999999,
                address: 'صنعاء - شعوب',
                warnings: 2,
            },
            {
                id: 12,
                name: 'فاطمة محمد',
                phone: 770000000,
                address: 'صنعاء - مديرية',
                warnings: 1,
            },
            {
                id: 13,
                name: 'خالد حسن',
                phone: 771111111,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 14,
                name: 'نور عبدالله',
                phone: 772222222,
                address: 'صنعاء - مدينة',
                warnings: 3,
            },
            {
                id: 15,
                name: 'لمى ياسر',
                phone: 773333333,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 16,
                name: 'عبدالرحمن محمود',
                phone: 774444444,
                address: 'صنعاء - مدينة',
                warnings: 2,
            },
            {
                id: 17,
                name: 'فهد علي',
                phone: 775555555,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 18,
                name: 'إيمان سليمان',
                phone: 776666666,
                address: 'صنعاء - مدينة',
                warnings: 4,
            },
            {
                id: 19,
                name: 'سلمى عبدالله',
                phone: 777777777,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 20,
                name: 'أحمد محمد',
                phone: 778888888,
                address: 'صنعاء - مدينة',
                warnings: 3,
            },
            {
                id: 21,
                name: 'نادية يوسف',
                phone: 779999999,
                address: 'صنعاء - شعوب',
                warnings: 2,
            },
            {
                id: 22,
                name: 'يوسف عبدالله',
                phone: 770000000,
                address: 'صنعاء - مديرية',
                warnings: 0,
            },
            {
                id: 23,
                name: 'سارة حسن',
                phone: 771111111,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 24,
                name: 'محمد نور',
                phone: 772222222,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 25,
                name: 'علي عبدالرحمن',
                phone: 773333333,
                address: 'صنعاء - مدينة',
                warnings: 1,
            },
            {
                id: 26,
                name: 'سلمان لمى',
                phone: 774444444,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 27,
                name: 'رحمة فهد',
                phone: 775555555,
                address: 'صنعاء - مدينة',
                warnings: 2,
            },
            {
                id: 28,
                name: 'ياسر إيمان',
                phone: 776666666,
                address: 'صنعاء - مدينة',
                warnings: 4,
            },
            {
                id: 29,
                name: 'فاطمة سلمى',
                phone: 777777777,
                address: 'صنعاء - مدينة',
                warnings: 0,
            },
            {
                id: 30,
                name: 'محمود يوسف',
                phone: 778888888,
                address: 'صنعاء - مدينة',
                warnings: 3,
            },
        ]

        return inertia.render('customersAccountsScreen', { customers })
    }
}