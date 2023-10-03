import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
    protected tableName = 'products'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('name', 50).notNullable().unique()
            table.string('model', 50).notNullable().unique()
            table.text('description').nullable()
            table.string('brand', 50).notNullable()
            table.text('flaws').nullable()
            table
                .integer('category_id')
                .unsigned()
                .references('categories.id')
                .notNullable()
            table.decimal('rating', 2, 1).notNullable().unsigned()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
