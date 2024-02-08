import { DateTime } from 'luxon'
import {
    BaseModel,
    BelongsTo,
    beforeFetch,
    beforeFind,
    belongsTo,
    column,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Ban extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public reason: string

    @column()
    public userId: number

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

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
