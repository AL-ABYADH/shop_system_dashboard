import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Product from './Product'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class CategoryModel extends BaseModel {
  @column({ isPrimary: true })
  public categoryId: number

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

  // Soft Delete
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete() {
    await softDelete(this)
  }
}
