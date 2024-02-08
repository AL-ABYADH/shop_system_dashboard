import { DateTime } from 'luxon'
import {
    BaseModel,
    BelongsTo,
    beforeFetch,
    beforeFind,
    belongsTo,
    column,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import User from './User'

export default class SellerWarning extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public reason: string

    @column()
    public sellerUserId: number

    @belongsTo(() => User)
    public seller: BelongsTo<typeof User>

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
