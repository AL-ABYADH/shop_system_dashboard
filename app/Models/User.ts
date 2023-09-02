import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  beforeFind,
  beforeFetch,
  beforeSave,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery } from '../Services/SoftDelete'
import Hash from '@ioc:Adonis/Core/Hash'

import Profile from './Profile'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public userId: number

  @column()
  public name: string

  @column()
  public email: string
  @column()
  public Password: string

  @column()
  public accountType: 'Admin' | 'Saler' | 'User'

  @column()
  public ProfileID: number

  @belongsTo(() => Profile)
  public profile: BelongsTo<typeof Profile>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Hash Password
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.Password = await Hash.make(user.Password)
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
