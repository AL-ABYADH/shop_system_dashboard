import { DateTime } from 'luxon'
import {
    BaseModel,
    column,
    beforeFind,
    beforeFetch,
    beforeSave,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'
import Hash from '@ioc:Adonis/Core/Hash'
import Address from './Address'
import Order from './Order'
import ProductItem from './ProductItem'
import UserProduct from './UserProduct'
import SellerWarning from './SellerWarning'

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public username: string // Login credential

    @column({ serializeAs: null })
    public password: string // Login credential

    @column()
    public fullName: string

    @column()
    public phoneNumber: string // Must be verified

    @column()
    public role: 'admin' | 'seller' | 'customer'

    @column()
    public preferredCurrency: 'YER' | 'USD' | 'SAR' | null // The preferred currency to display prices to the customer

    @column()
    public imageUrl: string | null // This will be mandatory for users of types "seller" (shop image), and "admin" (profile image). Not needed for customers

    @column()
    public shopOpenAt: string | null // Only for users of type "seller"

    @column()
    public shopCloseAt: string | null // Only for users of type "seller"

    @column()
    public shopCloseDays: string // JSON list of strings | null // Only for users of type "seller"

    @hasMany(() => Address)
    public addresses: HasMany<typeof Address> // Only users of types "seller" and "customer" will have at least one address

    @hasMany(() => SellerWarning, {
        foreignKey: 'sellerUserId',
        localKey: 'id',
    })
    public sellerWarnings: HasMany<typeof SellerWarning> // Only users of types "seller" will have warnings

    @hasMany(() => Order, {
        foreignKey: 'customerUserId',
        localKey: 'id',
    })
    public customerOrders: HasMany<typeof Order> // Only users of type "customer" will order orders

    @hasMany(() => Order, {
        foreignKey: 'sellerUserId',
        localKey: 'id',
    })
    public sellerOrders: HasMany<typeof Order> // Only users of type "seller" will be ordered from

    @hasMany(() => Order, {
        foreignKey: 'adminUserId',
        localKey: 'id',
    })
    public adminOrders: HasMany<typeof Order> // Only users of type "admin" will handle orders

    @hasMany(() => ProductItem, {
        foreignKey: 'sellerUserId',
        localKey: 'id',
    })
    public productItems: HasMany<typeof ProductItem> // Only users of type "seller" will have product items

    @hasMany(() => UserProduct, {
        foreignKey: 'sellerUserId',
        localKey: 'id',
    })
    public userProducts: HasMany<typeof UserProduct> // Only users of type "seller" will have user products

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime | null

    // Hash Password
    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    // Soft Delete
    @beforeFind()
    public static softDeletesFind = softDeleteQuery
    @beforeFetch()
    public static softDeletesFetch = softDeleteQuery

    public async softDelete() {
        await softDelete(this)
    }
}
