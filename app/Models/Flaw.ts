import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import ProductItem from './ProductItem'

export default class Flaw extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public flaw: string

    @column()
    public productItemId: number

    @belongsTo(() => ProductItem)
    public productItem: BelongsTo<typeof ProductItem>

    @column()
    public severityLevel:
        | 'verySlight'
        | 'slight'
        | 'noticeable'
        | 'sever'
        | 'verySever'

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
