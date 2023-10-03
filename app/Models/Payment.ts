import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Payment extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>

    @column()
    public paymentType: 'fromCustomer' | 'toSeller' | 'toAdmin' | 'refund'
    // "fromCustomer" paid when customer initiates an order
    // "toSeller" paid when admin marks order as "done", or when canceling order in the statuses of "confirmed" or "testing" (5%)
    // "toAdmin" paid when admin marks order as "done", or when canceling order in the status of "testing" (5%)
    // "refund" paid when customer returns defective items and gets cash refund instead of replacements (in case of replacements new order items are created and the olds ones are marked as "returned")

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
