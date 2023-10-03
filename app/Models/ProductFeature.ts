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
import Product from './Product'
import Feature from './Feature'
import ProductItem from './ProductItem'

export default class ProductFeature extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public value: string

    @column()
    public featureId: number

    @belongsTo(() => Feature)
    public feature: BelongsTo<typeof Feature>

    @column()
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>

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
