import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import ImagesGroup from './ImagesGroup'
import ProductItem from './ProductItem'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import { DateTime } from 'luxon'
import ProductFeature from './ProductFeature'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public model: string

  @column()
  public description: string

  @column()
  public brand: string

  @column()
  public flaws: string // Will look like this: ['first flaw', 'second flaw', ...]

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public rating: number // This will be taken from the product features to get a rating/10

  @hasOne(() => ImagesGroup)
  public imagesGroup: HasOne<typeof ImagesGroup>

  @hasMany(() => ProductItem)
  public productItems: HasMany<typeof ProductItem>

  @hasMany(() => ProductFeature)
  public productFeatures: HasMany<typeof ProductFeature>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true})
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
