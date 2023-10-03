import {
    BaseModel,
    beforeFetch,
    beforeFind,
    BelongsTo,
    belongsTo,
    column,
    hasMany,
    HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import ImageItem from './ImageItem'
import ProductItem from './ProductItem'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Product from './Product'

export default class ImagesGroup extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>

    @column()
    public productItemId: number

    @belongsTo(() => ProductItem)
    public productItem: BelongsTo<typeof ProductItem>

    // Either productId or productItemId should have a value, not both, nor neither. In the migration, both will be nullable

    @hasMany(() => ImageItem)
    public imageItems: HasMany<typeof ImageItem>

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
