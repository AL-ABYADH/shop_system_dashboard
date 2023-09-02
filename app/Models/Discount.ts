import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Discount extends BaseModel {
  @column({ isPrimary: true })
  public discountId: number

  @column()
  public rate: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public expiryDate: DateTime
}
