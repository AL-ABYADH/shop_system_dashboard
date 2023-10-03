import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Cart from './Cart'
import ProductItem from './ProductItem'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class CartItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public cartId: number

    @belongsTo(() => Cart)
    public cart: BelongsTo<typeof Cart>

    @column()
    public productItemId: number

    @belongsTo(() => ProductItem)
    public productItem: BelongsTo<typeof ProductItem>

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
