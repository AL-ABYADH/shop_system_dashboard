import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ReturnRequestItems extends BaseSchema {
    protected tableName = 'return_request_items'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.text('reason').notNullable()
            table
                .integer('return_request_id')
                .unsigned()
                .references('return_requests.id')
                .notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
            table
                .integer('order_item_id')
                .unsigned()
                .references('order_items.id')
                .notNullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
