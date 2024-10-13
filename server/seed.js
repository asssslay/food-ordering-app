const { faker } = require("@faker-js/faker");
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");

async function main() {
  const url = "mongodb://localhost:27017";
  const client = new MongoClient(url);

  try {
    await client.connect();

    const productCollection = client.db("food-ordering").collection("products");
    const categoryCollection = client
      .db("food-ordering")
      .collection("categories");

    await productCollection.drop();
    let categories = ["breakfast", "lunch", "dinner", "drinks"].map(
      (category) => {
        return { name: category };
      }
    );
    await categoryCollection.insertMany(categories);

    let imageUrls = [
      "https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/1_mfgcb5.png",
      "https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/2_afbbos.png",
      "https://res.cloudinary.com/dlv0lekro/image/upload/v1657056151/food-ordering-app/3_iawvqb.png",
    ];

    let products = [];
    for (let i = 0; i < 10; i++) {
      let newProduct = {
        name: faker.commerce.productName(),
        adjective: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(), // Використовуй productDescription()
        price: faker.commerce.price(),
        categories: _.sample(categories),
        imageUrls: _.sample(imageUrls),
      };
      products.push(newProduct);
    }
    await productCollection.insertMany(products);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
