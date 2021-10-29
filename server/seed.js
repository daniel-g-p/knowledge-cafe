import Chance from "chance";

import { connectToDatabase } from "./utilities/database.js";
import Product from "./models/Product.js";

const chance = new Chance();

const seedProducts = async (numberOfProducts) => {
  await Product.deleteAll();
  for (let i = 0; i < numberOfProducts; i++) {
    const product = new Product(
      chance.word(),
      chance.word({ length: 3 }),
      chance.integer({ min: 1, max: 3 }),
      chance.sentence(),
      [chance.word(), chance.word(), chance.word()]
    );
    await product.create();
  }
  console.log("Products seeded");
};

const seed = async () => {
  try {
    await connectToDatabase();
    await seedProducts(5);
    console.log("Database seeded");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

seed();
