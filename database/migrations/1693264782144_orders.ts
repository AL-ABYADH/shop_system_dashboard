import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Orders extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("order_id");
      table.integer("user_id").unsigned().references("users.user_id");
      table
        .integer("payment_method_id")
        .unsigned()
        .references("payment_methods.payment_method_id");
      table
        .integer("shipping_method_id")
        .unsigned()
        .references("shipping_methods.shipping_method_id");
      table.integer("address_id").unsigned().references("addresses.address_id");
      table
        .integer("payment_status_id")
        .unsigned()
        .references("payment_statuses.payment_status_id");
      table
        .enum("Status", ["Testing", "Confirmation", "Sold", "Canceled"])
        .notNullable();
      table.timestamp("Timestamp").defaultTo(this.now());
      table.decimal("total_price", 10, 2);
      table.integer("AdminID").unsigned().references("admins.AdminID");
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
