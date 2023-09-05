import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "./temp/User";
import PaymentMethod from "./PaymentMethod";
import ShippingMethod from "./ShippingMethod";
import Address from "./Address";
import OrderStatus from "./OrderStatus";
import Admin from "./Admin";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public orderId: number;

  @column()
  public userId: number;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @column()
  public paymentMethodId: number;

  @belongsTo(() => PaymentMethod)
  public paymentMethod: BelongsTo<typeof PaymentMethod>;

  @column()
  public shippingMethodId: number;

  @belongsTo(() => ShippingMethod)
  public shippingMethod: BelongsTo<typeof ShippingMethod>;

  @column()
  public addressId: number;

  @belongsTo(() => Address)
  public address: BelongsTo<typeof Address>;

  @column()
  public Status: "Testing" | "Confirmation" | "Sold" | "Canceled";

  @column()
  public orderStatusId: number;

  @belongsTo(() => OrderStatus)
  public orderStatus: BelongsTo<typeof OrderStatus>;

  @column()
  public totalPrice: number;

  @column.date()
  public orderDate: DateTime;

  @column()
  public AdminID: number;

  @belongsTo(() => Admin)
  public adminId: BelongsTo<typeof Admin>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
