import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public addressId: number

  @column()
  public userId: number

  @column()
  public Address: string

  @column({ serializeAs: null })
  public Latitude: number

  @column({ serializeAs: null })
  public Longitude: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
