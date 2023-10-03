import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CartItems extends BaseSchema {
    protected tableName = 'cart_items'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('cart_id')
                .unsigned()
                .references('carts.id')
                .notNullable()
            table
                .integer('product_item_id')
                .unsigned()
                .references('product_items.id')
                .notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
