import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class CategoryModel extends BaseModel {
  @column({ isPrimary: true })
  public categoryId: number

  @column()
  public parentCategoryId: number

  @column()
  public categoryName: string

  @hasOne(() => Category)
  public parentCategory: HasOne<typeof Category>
}
