import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('UserID').primary()
      table.string('Username', 255).notNullable()
      table.string('Password', 255).notNullable()
      table.enum('AccountType', ['Admin', 'Saler', 'User']).notNullable()
      table.integer('ProfileID').unsigned().references('Profiles.ProfileID')
      table.dateTime('deleted_at').defaultTo(null)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
