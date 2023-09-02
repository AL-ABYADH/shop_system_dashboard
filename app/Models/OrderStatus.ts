import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class OrderStatus extends BaseModel {
  @column({ isPrimary: true })
  public orderStatusId: number

  @column()
  public orderStatusValue: string
}
