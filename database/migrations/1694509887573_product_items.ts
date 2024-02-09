import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductItems extends BaseSchema {
    protected tableName = 'product_items'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.text('description').nullable()
            table.string('model').notNullable()
            table
                .integer('product_id')
                .unsigned()
                .references('products.id')
                .notNullable()
            table
                .integer('seller_user_id')
                .unsigned()
                .references('users.id')
                .notNullable()
            table
                .integer('price_id')
                .unsigned()
                .references('prices.id')
                .notNullable()
            table.integer('warranty_ends_in').unsigned().notNullable()
            table.boolean('used_product').notNullable()
            table.decimal('product_rating', 2, 1).notNullable().unsigned()
            table
                .enum('used_product_condition', [
                    'excellent',
                    'good',
                    'normal',
                    'bad',
                    'terrible',
                ])
                .nullable()
            table
                .enum('status', ['available', 'sold', 'reserved', 'returned'])
                .defaultTo('available')
                .notNullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
