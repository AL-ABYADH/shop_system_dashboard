import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ImagesGroups extends BaseSchema {
    protected tableName = 'images_groups'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table
                .integer('product_id')
                .unsigned()
                .references('products.id')
                .nullable()
            table
                .integer('product_item_id')
                .unsigned()
                .references('product_items.id')
                .nullable()
            table.timestamps(true, true) // created_at and updated_at
            table.timestamp('deleted_at').nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
