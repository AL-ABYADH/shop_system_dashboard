import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Image from './Image'

export default class ImageItem extends BaseModel {
  @column({ isPrimary: true })
  public imageItemId: number

  @column()
  public imageId: number

  @column()
  public isPrimary: boolean

  @column()
  public imageUrl: string

  @belongsTo(() => Image)
  public image: BelongsTo<typeof Image>
}
