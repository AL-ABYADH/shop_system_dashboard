import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 50).notNullable()
      table.string('password', 50).notNullable()
      table.string('full_name', 50).notNullable()
      table.string('phone_number', 9).notNullable()
      table.enum('account_type', ['admin', 'seller', 'customer']).notNullable()
      table.enum('preferred_currency', ['YER', 'USD', 'SAR']).nullable()
      table.text('image_url').nullable()
      table.integer('warnings_count').nullable()
      table.time('shop_open_at').nullable()
      table.time('shop_close_at').nullable()
      table.timestamps(true, true) // created_at and updated_at
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
