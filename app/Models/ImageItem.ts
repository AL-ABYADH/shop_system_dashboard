import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import ImagesGroup from './ImagesGroup'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class ImageItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public imagesGroupId: number

    @belongsTo(() => ImagesGroup)
    public imagesGroup: BelongsTo<typeof ImagesGroup>

    @column()
    public isPrimary: boolean // Should be true for only one of the image items belonging to an ImagesGroup object

    @column()
    public imageUrl: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @column.dateTime()
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
