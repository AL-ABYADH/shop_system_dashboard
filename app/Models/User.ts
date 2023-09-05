import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  beforeSave,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'
import Hash from '@ioc:Adonis/Core/Hash'
import Address from './Address'
import Order from './Order'
import Product from './Product'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userId: number

  @column()
  public username: string // Login credential

  @column()
  public password: string // Login credential

  @column()
  public fullName: string

  @column()
  public phoneNumber: string // Must be verified

  @column()
  public imageUrl: string // This will be mandatory for users of types "seller" (shop image), and "admin" (profile image). Not needed for customers

  @column()
  public accountType: 'admin' | 'seller' | 'customer'

  @column()
  public shopOpenAt: DateTime // Only for users of type "seller"

  @column()
  public shopCloseAt: DateTime // Only for users of type "seller"

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true})
  public deletedAt: DateTime | null

  @hasMany(() => Address)
  public addresses: HasMany<typeof Address> // Only users of type "seller" will have at least one address

  @hasMany(() => Order)
  public orderedOrders: HasMany<typeof Order> // Only users of type "customer" will order orders

  @hasMany(() => Order)
  public handledOrders: HasMany<typeof Order> // Only users of type "customer" will handle orders

  @hasMany(() => Product)
  public products: HasMany<typeof Product> // Only users of type "seller" will have products

  // Hash Password
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // Soft Delete
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete() {
    await softDelete(this)
  }
}
