import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Variants extends BaseSchema {
  protected tableName = 'variants'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('variant_id').primary()
      table.integer('variation_id').unsigned().references('variations.variation_id').notNullable()
      table.string('value', 50).notNullable()

      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
