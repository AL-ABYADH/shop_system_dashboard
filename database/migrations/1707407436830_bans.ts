import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bans extends BaseSchema {
    protected tableName = 'bans'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.text('reason').notNullable()
            table
                .integer('user_id')
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
