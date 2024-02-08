import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SellerWarnings extends BaseSchema {
    protected tableName = 'seller_warnings'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.text('reason').notNullable()
            table
                .integer('seller_user_id')
                .unsigned()
                .references('users.id')
                .notNullable()

            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
