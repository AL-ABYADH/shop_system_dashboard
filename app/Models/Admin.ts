import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public AdminID: number

  @column()
  public Username: string

  @column()
  public Password: string
}
