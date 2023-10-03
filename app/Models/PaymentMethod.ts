import {
    BaseModel,
    beforeFetch,
    beforeFind,
    column,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'
import { DateTime } from 'luxon'

export default class PaymentMethod extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public method: string

    @column()
    public accountNumber: string

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
