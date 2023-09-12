import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Orders extends BaseSchema {
  protected tableName = 'orders';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('customer_user_id').unsigned().references('users.id').notNullable();
      table.integer('seller_user_id').unsigned().references('users.id').notNullable();
      table.integer('admin_user_id').unsigned().references('users.id').notNullable();
      table.integer('payment_method_id').unsigned().references('payment_methods.id').notNullable();
      table.integer('seller_address_id').unsigned().references('addresses.id').notNullable();
      table.integer('customer_address_id').unsigned().references('addresses.id').notNullable();
      table.decimal('total_price', 10, 2).unsigned().notNullable();
      table.enum('status', ['awaiting', 'confirming', 'confirmed', 'testing', 'done', 'canceled', 'returningItem']).notNullable();
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
