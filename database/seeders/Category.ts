import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
    public async run() {
        Category.updateOrCreate(
            { categoryName: 'phones' },
            { categoryName: 'phones' }
        )
    }
}
