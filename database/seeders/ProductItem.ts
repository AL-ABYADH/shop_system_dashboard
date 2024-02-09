import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Product from 'App/Models/Product'
import ProductItem from 'App/Models/ProductItem'
import ImagesGroup from 'App/Models/ImagesGroup'
import ImageItem from 'App/Models/ImageItem'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import path from 'path'

export default class ProductItemSeeder extends BaseSeeder {
    public async run() {
        // Check if any product items already exist
        const existingProductItems = await ProductItem.query().limit(1)
        if (existingProductItems.length > 0) {
            // Product items already exist, so we don't need to seed again
            return
        }

        // Fetch all products
        const products = await Product.all()

        // Define arrays to store entities for bulk insertion
        let itemId = 1

        // Item conditions to choose randomly from
        const conditions: (
            | 'excellent'
            | 'good'
            | 'normal'
            | 'bad'
            | 'terrible'
        )[] = ['excellent', 'good', 'normal', 'bad', 'terrible']

        // Iterate through each product and create 5 product items for each
        for (const product of products) {
            let priceId = 1
            const sellerUserIds: number[] = [2, 5, 8, 11, 14]

            for (let i = 1; i <= 5; i++) {
                const used = Math.random() < 0.5

                const productItem = await ProductItem.create({
                    description: `Product ${product.id} Item ${i}`,
                    productId: product.id,
                    model: `Model A${i}`,
                    sellerUserId: sellerUserIds[i - 1],
                    priceId: priceId,
                    warrantyEndsIn: 365,
                    usedProduct: used,
                    usedProductCondition: used
                        ? conditions[
                              Math.floor(Math.random() * conditions.length)
                          ]
                        : null,
                    productRating: product.rating,
                })

                // Assuming a function to handle image uploading and return paths
                const imagePaths = await this.uploadRandomImages() // This should return an array of image URLs/paths

                const imagesGroup = await ImagesGroup.create({
                    productItemId: productItem.id,
                })

                await Promise.all(
                    imagePaths.map((path, index) =>
                        ImageItem.create({
                            imagesGroupId: imagesGroup.id,
                            isPrimary: index === 0,
                            imageUrl: path,
                        })
                    )
                )

                priceId++
                itemId++
            }
        }
    }

    private async uploadRandomImages(): Promise<string[]> {
        // Adjusted the sourceDir to point to the 'images' folder in the 'seeders' directory
        const sourceDir = path.join(
            Application.appRoot,
            'database/seeders/images'
        )
        const targetDir = path.join(Application.publicPath(), 'uploads')

        // Ensure the target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true })
        }

        // List all files in the source directory
        const files = fs.readdirSync(sourceDir)

        // Randomly select a subset of images to simulate the upload
        const selectedFiles = files.sort(() => 0.5 - Math.random()).slice(0, 3)

        const uploadedPaths = selectedFiles.map((file) => {
            const sourceFilePath = path.join(sourceDir, file)
            const targetFilePath = path.join(targetDir, file)

            // Copy the file to simulate uploading
            fs.copyFileSync(sourceFilePath, targetFilePath)

            // Return the relative path to the uploaded file
            return `/uploads/${file}`
        })

        return uploadedPaths
    }
}
