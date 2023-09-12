import { BaseModel, column, belongsTo, BelongsTo, beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import Category from './Category'

export default class Feature extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public feature: string

  @column()
  public type: 'string' | 'number' | 'list' | 'list<number>' | 'list<string>'

  @column()
  public categoryId: number

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

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
