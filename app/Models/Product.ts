import { BaseModel, column, belongsTo, BelongsTo, hasOne, HasOne, hasMany, HasMany, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import ImagesGroup from './ImagesGroup'
import ProductItem from './ProductItem'
import User from './User'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public productId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public brand: string

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column()
  public sellerUserId: number

  @belongsTo(() => User)
  public seller: BelongsTo<typeof User>

  @hasOne(() => ImagesGroup)
  public imagesGroup: HasOne<typeof ImagesGroup>

  @hasMany(() => ProductItem)
  public productItems: HasMany<typeof ProductItem>

  // @column()
  // public rating: number

  // Soft Delete
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete() {
    await softDelete(this)
  }
}
