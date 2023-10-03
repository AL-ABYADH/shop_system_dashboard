import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
    protected tableName = 'reviews'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('customer_user_id')
                .unsigned()
                .references('users.id')
                .notNullable()

            // Only one of the following two columns should be null and the other one must have a value
            table
                .integer('product_id')
                .unsigned()
                .references('products.id')
                .nullable()
            table
                .integer('seller_user_id')
                .unsigned()
                .references('users.id')
                .nullable()

            table.integer('rating').unsigned().notNullable() // 1 => 5
            table.text('comment').notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
