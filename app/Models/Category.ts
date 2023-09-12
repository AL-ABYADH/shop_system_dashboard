import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import { DateTime } from 'luxon'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryName: string

  @column()
  public parentCategoryId: number

  @belongsTo(() => Category)
  public parentCategory: BelongsTo<typeof Category>

  @hasMany(() => Product)
  public products: HasMany<typeof Product>

  @hasMany(() => Category)
  public subCategories: HasMany<typeof Category>

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
