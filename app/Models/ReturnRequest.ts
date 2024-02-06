import { DateTime } from 'luxon'
import {
    BaseModel,
    BelongsTo,
    HasMany,
    beforeFetch,
    beforeFind,
    belongsTo,
    column,
    hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Order from './Order'
import ReturnRequestItem from './ReturnRequestItem'

export default class ReturnRequest extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>

    @column()
    public status: 'awaiting' | 'evaluating' | 'resolved'
    // 'awaiting' is when the request is first created.
    // 'evaluating' is when the request has been handled by admin.
    // 'resolved' is when the request has been resolved by admin whether the items were returned or the request was dismissed.

    @hasMany(() => ReturnRequestItem)
    public returnRequestItems: HasMany<typeof ReturnRequestItem>

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
