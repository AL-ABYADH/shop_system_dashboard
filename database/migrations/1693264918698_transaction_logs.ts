import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TransactionLogs extends BaseSchema {
    protected tableName = 'transaction_logs'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .notNullable()
            table.string('action', 50).notNullable()
            table.string('affected_table', 50).notNullable()
            table.integer('affected_row').notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
