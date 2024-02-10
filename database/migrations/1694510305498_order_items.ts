import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrderItems extends BaseSchema {
    protected tableName = 'order_items'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('order_id')
                .unsigned()
                .references('orders.id')
                .notNullable()
            table.decimal('order_item_price', 10, 2).unsigned().notNullable()
            table
                .integer('product_item_id')
                .unsigned()
                .references('product_items.id')
                .notNullable()
            table.boolean('returned').defaultTo(false).notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
