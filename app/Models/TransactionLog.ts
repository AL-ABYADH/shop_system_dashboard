import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TransactionLog extends BaseModel {
  @column({ isPrimary: true })
  public logId: number

  @column()
  public userId: number

  @column()
  public action: string

  @column()
  public affectedTable: string

  @column()
  public affectedRow: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
