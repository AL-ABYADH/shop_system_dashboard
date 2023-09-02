import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Order from './Order'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public paymentId: number

  @column()
  public userId: number

  @column()
  public orderId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>
}
