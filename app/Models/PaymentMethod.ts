import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public paymentMethodId: number

  @column()
  public name: string

  @column()
  public accountNumber: string
}
