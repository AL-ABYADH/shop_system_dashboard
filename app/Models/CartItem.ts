import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cart from './Cart'
import ProductItem from './ProductItem'

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  public cartItemId: number

  @column()
  public cartId: number

  @column()
  public productItemId: number

  @column()
  public quantity: number

  @belongsTo(() => Cart)
  public cart: BelongsTo<typeof Cart>

  @belongsTo(() => ProductItem)
  public productItem: BelongsTo<typeof ProductItem>
}
