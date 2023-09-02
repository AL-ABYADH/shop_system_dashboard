import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Location from './Address'

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public ProfileID: number

  @column()
  public FullName: string

  @column()
  public Email: string

  @column()
  public Phone: string

  @column()
  public LocationID: number

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>
}
