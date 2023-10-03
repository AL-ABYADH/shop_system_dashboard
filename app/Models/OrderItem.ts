import {
    BaseModel,
    column,
    belongsTo,
    BelongsTo,
    beforeFind,
    beforeFetch,
} from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import ProductItem from './ProductItem'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from 'App/Services/SoftDelete'

export default class OrderItem extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public orderId: number

    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>

    @column()
    public productItemId: number

    @belongsTo(() => ProductItem)
    public productItem: BelongsTo<typeof ProductItem>

    @column()
    public returned: boolean // This will be true when returning an order item of which the product item's warranty hasn't ended

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
