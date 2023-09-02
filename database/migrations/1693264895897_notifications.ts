import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Notifications extends BaseSchema {
  protected tableName = 'notifications'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('notification_id').primary()
      table.integer('user_id').unsigned().references('users.user_id').notNullable()
      table.string('message', 255).notNullable()
      table.timestamp('Timestamp').defaultTo(this.now()).notNullable
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
