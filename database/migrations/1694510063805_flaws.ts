import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Flaws extends BaseSchema {
    protected tableName = 'flaws'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('flaw', 50).notNullable()
            table
                .integer('product_item_id')
                .unsigned()
                .references('product_items.id')
                .notNullable()
            table.enum('severity_lever', [
                'varySlight',
                'slight',
                'noticeable',
                'sever',
                'verySever',
            ])
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
