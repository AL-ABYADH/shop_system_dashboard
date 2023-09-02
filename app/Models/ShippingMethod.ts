import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Price from './Price'

export default class ShippingMethod extends BaseModel {
  @column({ isPrimary: true })
  public shippingMethodId: number

  @column()
  public priceId: number

  @column()
  public name: string

  @hasOne(() => Price)
  public price: HasOne<typeof Price>
}
