import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Currency extends BaseModel {
  @column({ isPrimary: true })
  public currencyId: number

  @column()
  public name: string
}
