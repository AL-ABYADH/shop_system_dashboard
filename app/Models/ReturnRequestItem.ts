import { DateTime } from 'luxon'
import {
    BaseModel,
    BelongsTo,
    beforeFetch,
    beforeFind,
    belongsTo,
    column,
} from '@ioc:Adonis/Lucid/Orm'
import ReturnRequest from './ReturnRequest'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import OrderItem from './OrderItem'

export default class ReturnRequestItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public reason: string

    @column()
    public returnRequestId: number

    @belongsTo(() => ReturnRequest)
    public returnRequest: BelongsTo<typeof ReturnRequest>

    @column()
    public orderItemId: number

    @belongsTo(() => OrderItem)
    public orderItem: BelongsTo<typeof OrderItem>

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
