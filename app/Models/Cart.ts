import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "./temp/User";

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public cartId: number;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
