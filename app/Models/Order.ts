import { DateTime } from 'luxon'
import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PaymentMethod from './PaymentMethod'
import Address from './Address'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Payment from './Payment'
import ReturnRequest from './ReturnRequest'

export default class Order extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public customerUserId: number // The customer user that made the order

    @belongsTo(() => User)
    public customer: BelongsTo<typeof User>

    @column()
    public sellerUserId: number // The seller user the items belong to

    @belongsTo(() => User)
    public seller: BelongsTo<typeof User>

    @column()
    public adminUserId: number | null // The admin user that handled the order

    @belongsTo(() => User)
    public admin: BelongsTo<typeof User>

    @column()
    public paymentMethodId: number

    @belongsTo(() => PaymentMethod)
    public paymentMethod: BelongsTo<typeof PaymentMethod>

    @column()
    public sellerAddressId: number

    @belongsTo(() => Address)
    public sellerAddress: BelongsTo<typeof Address>

    @column()
    public customerAddressId: number // Null if no delivery is required

    @belongsTo(() => Address)
    public customerAddress: BelongsTo<typeof Address>

    @column()
    public deliveryPrice: number | null // Null if no delivery is required

    @column()
    public totalPrice: number // Including the delivery price and the product items prices. Will be converted to the user's preferred currency

    @column()
    public currency: 'USD' | 'YER' | 'SAR' // Will be taken from the user's preferred currency

    @column()
    public status:
        | 'awaiting'
        | 'confirming'
        | 'confirmed'
        | 'testing'
        | 'done'
        | 'canceled'
        | 'returnRequest'
    // "awaiting" if no admin has handled the order yet (adminUserId is null), and seller hasn't confirm that the product is available or not. Able to cancel order with no canceling fee
    // "confirming" if admin handles order that got no confirmation from the seller. Able to cancel order with no canceling fee
    // "confirmed" if seller confirms that the product item. Able to cancel order with a canceling fee. If canceled, 5% is paid to the seller, 10% to the business, and 85% back to the customer
    // "testing" if admin handles order while in "confirmed" state, or changing state from "confirming". Able to cancel order with a canceling fee. If canceled, 5% is paid to the seller, 5% to the admin, 5% to the business, and 85% back to the customer
    // "done" if order has been done. Not able to cancel anymore
    // "canceled" if for any reason the order is canceled
    // "returnRequest" if customer tries to return order item of which the product item's warranty hasn't ended

    @hasMany(() => Payment)
    public payments: HasMany<typeof Payment>

    @hasMany(() => ReturnRequest)
    public returnRequests: HasMany<typeof ReturnRequest>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
    public deletedAt: DateTime | null

    // Soft Delete
    @beforeFind()
    public static softDeletesFind = softDeleteQuery
    @beforeFetch()
    public static softDeletesFetch = softDeleteQuery

    public async softDelete() {
        await softDelete(this)
    }
}
