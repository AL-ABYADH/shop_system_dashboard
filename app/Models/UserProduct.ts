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
import Product from './Product'

export default class UserProduct extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public userId: number

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @column()
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>

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
