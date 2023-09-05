import { BaseModel, beforeFetch, beforeFind, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ImageItem from './ImageItem'
import ProductItem from './ProductItem'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class ImagesGroup extends BaseModel {
  @column({ isPrimary: true })
  public imagesGroupId: number

  @column()
  public productItemId: number

  @belongsTo(() => ProductItem)
  public productItem: BelongsTo<typeof ProductItem>

  @hasMany(() => ImageItem)
  public imageItems: HasMany<typeof ImageItem>

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
