const { faker } = require('@faker-js/faker');
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require('mongodb');
const _ = require("lodash");

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const productsCollection = client.db("food-ordering").collection("products");
        const categoriesCollection = client.db("food-ordering").collection("categories");

        // Drop existing collections
        await productsCollection.drop().catch(() => {});
        await categoriesCollection.drop().catch(() => {});

        // Create categories with MongoDB ObjectId
        let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map((category) => { 
            return { 
                _id: new ObjectId(),
                name: { 
                    name: category,
                    _id: new ObjectId().toString()
                }
            }; 
        });
        await categoriesCollection.insertMany(categories);

        let imageUrls = [
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png',
            'https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png',
        ]

        let products = [];
        for (let i = 0; i < 12; i += 1) {
            const categoryIndex = i % categories.length;
            let newProduct = {
                name: faker.commerce.productName(),
                adjective: faker.commerce.productAdjective(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(),
                category: categories[categoryIndex].name.name,
                imageUrls: _.sample(imageUrls)
            };
            products.push(newProduct);
        }
        await productsCollection.insertMany(products);
        console.log('Database seeded successfully');
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();