import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('ProfileID').primary()
      table.string('FullName', 255).notNullable()
      table.string('Email', 255)
      table.string('Phone', 20)
      table.integer('LocationID').unsigned().references('Locations.LocationID')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
