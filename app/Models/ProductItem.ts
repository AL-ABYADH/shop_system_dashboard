import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class ProductItem extends BaseModel {
  @column({ isPrimary: true })
  public productItemId: number

  @column()
  public productId: number

  @column()
  public Flaws: string

  @column()
  public PhoneStatus: string

  @column()
  public Availability: string

  @column()
  public Description: string

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
