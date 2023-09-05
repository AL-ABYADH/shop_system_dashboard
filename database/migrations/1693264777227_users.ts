import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('user_id').primary()
      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
      table.string('full_name', 255).notNullable()
      table.string('phone_number', 20).notNullable()
      table.enum('account_type', ['admin', 'seller', 'customer']).notNullable()
      table.time('shop_open_at').notNullable()
      table.time('shop_close_at').notNullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
