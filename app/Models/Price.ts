import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Discount from './Discount'
import Currency from './Currency'

export default class Price extends BaseModel {
  @column({ isPrimary: true })
  public priceId: number

  @column()
  public discountId: number

  @column()
  public currencyId: number

  @belongsTo(() => Discount)
  public discount: BelongsTo<typeof Discount>

  @belongsTo(() => Currency)
  public currency: BelongsTo<typeof Currency>
}
