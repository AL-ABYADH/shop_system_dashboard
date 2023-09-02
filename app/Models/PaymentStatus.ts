import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PaymentStatus extends BaseModel {
  @column({ isPrimary: true })
  public paymentStatusId: number

  @column()
  public paymentStatusValue: string
}
