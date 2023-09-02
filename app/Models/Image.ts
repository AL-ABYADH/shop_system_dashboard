import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import ImageItem from './ImageItem'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public imageId: number

  @hasMany(() => ImageItem)
  public imageItems: HasMany<typeof ImageItem>
}
