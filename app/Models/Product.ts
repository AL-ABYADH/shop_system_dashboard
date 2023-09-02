import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Image from './Image'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public productId: number

  @column()
  public categoryId: number

  @column()
  public imagesId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public Brand: string

  // @column()
  // public rating: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Image)
  public image: BelongsTo<typeof Image>
}
