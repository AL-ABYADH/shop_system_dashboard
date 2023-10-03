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
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import CartItem from './CartItem'

export default class Cart extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public customerId: number

    @belongsTo(() => User)
    public customer: BelongsTo<typeof User>

    @hasMany(() => CartItem)
    public cartItems: HasMany<typeof CartItem>

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
