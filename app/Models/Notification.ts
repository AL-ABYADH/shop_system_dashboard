import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { DateTime } from 'luxon'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public notificationId: number

  @column()
  public userId: number

  @column()
  public message: string

  @column.dateTime()
  public timestamp: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
