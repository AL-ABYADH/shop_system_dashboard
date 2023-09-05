import { BaseModel, column, belongsTo, BelongsTo, beforeFind, beforeFetch } from "@ioc:Adonis/Lucid/Orm"
import User from "./temp/User"
import { DateTime } from "luxon"
import { softDelete, softDeleteQuery } from "App/Services/SoftDelete"

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public addressId: number

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public address: string

  @column({ serializeAs: null })
  public latitude: number

  @column({ serializeAs: null })
  public longitude: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true})
  public deletedAt: DateTime | null

  // Soft Delete
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete() {
    await softDelete(this)
  }
}
