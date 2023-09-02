import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public reviewId: number

  @column()
  public userId: number

  @column()
  public productId: number

  @column()
  public rating: number

  @column()
  public comment: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>
}
