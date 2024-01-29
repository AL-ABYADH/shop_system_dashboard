import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ReturnRequests extends BaseSchema {
    protected tableName = 'return_requests'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('order_id')
                .unsigned()
                .references('orders.id')
                .notNullable()
            table
                .enum('status', ['awaiting', 'evaluating', 'resolved'])
                .notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
