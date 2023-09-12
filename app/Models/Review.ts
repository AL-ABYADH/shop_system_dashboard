import { BaseModel, column, belongsTo, BelongsTo, beforeFind, beforeFetch } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Product from "./Product";
import { DateTime } from "luxon";
import { softDelete, softDeleteQuery } from "App/Services/SoftDelete";

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customerUserId: number; // The customer that wrote the review

  @belongsTo(() => User)
  public customer: BelongsTo<typeof User>;

  @column()
  public productId: number; // The review could be about a product

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;

  @column()
  public sellerUserId: number; // The review could be about a seller

  @belongsTo(() => User)
  public seller: BelongsTo<typeof User>;

  @column()
  public rating: number;

  @column()
  public comment: string;

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
