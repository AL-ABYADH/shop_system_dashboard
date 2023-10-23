import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserProducts extends BaseSchema {
    protected tableName = 'user_products'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .notNullable()
            table
                .integer('product_id')
                .unsigned()
                .references('products.id')
                .nullable()

            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
