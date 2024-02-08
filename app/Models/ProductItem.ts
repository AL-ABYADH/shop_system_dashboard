import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    hasMany,
    HasMany,
    beforeFind,
    beforeFetch,
    hasOne,
    HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import ProductFeature from './ProductFeature'
import Flaw from './Flaw'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import ImagesGroup from './ImagesGroup'
import Price from './Price'
import User from './User'

export default class ProductItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public description: string | null

    @column()
    public productId: number

    @belongsTo(() => Product)
    public product: BelongsTo<typeof Product>

    @column()
    public model: string // Will be one of the available models that the product has

    @column()
    public sellerUserId: number

    @belongsTo(() => User)
    public seller: BelongsTo<typeof User>

    @column()
    public priceId: number // Will be entered by the seller, and the admin's and business's commissions will be added to it automatically

    @belongsTo(() => Price)
    public price: BelongsTo<typeof Price>

    @column()
    public warrantyEndsIn: number // Number of days which will be converted to weeks, months, or years

    @column()
    public usedProduct: boolean

    @column()
    public usedProductCondition:
        | 'excellent'
        | 'good'
        | 'normal'
        | 'bad'
        | 'terrible'
        | null // How clean or new the product is if it's used. Null if the product is new (usedProduct = false)

    @column()
    public status: 'available' | 'sold' | 'reserved' | 'returned'
    // "available" if not included in an order
    // "sold" if included in an order in the status "sold", or if marked as "sold" by the seller
    // "reserved" if included in an order in any other status
    // "returned" if the product item has been returned by a resolved return request

    @hasOne(() => ImagesGroup)
    public imagesGroup: HasOne<typeof ImagesGroup>

    @hasMany(() => ProductFeature)
    public productFeatures: HasMany<typeof ProductFeature>

    @hasMany(() => Flaw)
    public flaws: HasMany<typeof Flaw>

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
