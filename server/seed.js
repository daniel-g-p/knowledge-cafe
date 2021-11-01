import Chance from "chance";

import { connectToDatabase } from "./utilities/database.js";
import { hashPassword } from "./utilities/encryption.js";

import Product from "./models/Product.js";
import Event from "./models/Event.js";
import Order from "./models/Order.js";
import User from "./models/User.js";

const chance = new Chance();

const productData = [
  {
    name: "Espresso",
    tag: "esp",
    price: 2,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Double Espresso",
    tag: "desp",
    price: 2,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Americano",
    tag: "ame",
    price: 2,
    description: "Lorem ipsum dolor sit amet",
  },
  {
    name: "Cappuccino",
    tag: "cap",
    price: 2,
    description: "Lorem ipsum dolor sit amet",
    variations: ["Vollmilch", "Hafermilch"],
  },
  {
    name: "Latte Macchiato",
    tag: "lam",
    price: 2,
    description: "Lorem ipsum dolor sit amet",
    variations: ["Vollmilch", "Hafermilch"],
  },
];

const teamData = [
  "Emilie",
  "Florin",
  "Rico",
  "Daniel",
  "Clara",
  "Anna Maria",
  "Leonie",
  "Alexis",
  "Allie",
  "Vivianne",
  "Feli",
  "Xiannan",
  "Caro",
  "Olivia",
];

const seedProducts = async (productData) => {
  await Product.deleteAll();
  const products = [];
  for (let item of productData) {
    const product = new Product(
      item.name,
      item.tag,
      item.price,
      item.description,
      item.variations
    );
    await product.create();
    products.push(product);
  }
  console.log("Products seeded");
  return products;
};

const seedEvents = async (numberOfEvents) => {
  await Event.deleteAll();
  const events = [];
  for (let i = 0; i < numberOfEvents; i++) {
    const event = new Event(`Testevent ${i + 1}`);
    await event.create();
    events.push(event);
  }
  console.log("Events seeded.");
  return events;
};

const seedOrders = async (products, events, ordersPerEvent) => {
  await Order.deleteAll();
  const orders = [];
  for (let event of events) {
    for (let i = 0; i < ordersPerEvent; i++) {
      const numberOfItems = chance.integer({ min: 1, max: 3 });
      const items = [];
      for (let j = 0; j < numberOfItems; j++) {
        const prodIndex = chance.integer({ min: 0, max: products.length - 1 });
        const { _id, name, price, variations } = products[prodIndex];
        const hasVars = variations.length;
        const varIndex = hasVars
          ? chance.integer({ min: 0, max: variations.length - 1 })
          : 0;
        const variation = varIndex ? variations[varIndex] : "";
        const item = {
          id: _id,
          name,
          quantity: 1,
          price,
          variation,
        };
        items.push(item);
      }
      const order = new Order(
        event._id.toString(),
        chance.first(),
        chance.bool() ? "Lorem ipsum dolor sit amet" : "",
        items,
        "cash",
        items.reduce((result, item) => {
          return result + item.price * item.quantity;
        }, 0)
      );
      await order.create();
      orders.push(order);
    }
  }
  console.log("Orders seeded.");
  return orders;
};

const seedAdmin = async () => {
  await User.deleteAll();
  let token = "";
  for (let i = 0; i < 6; i++) {
    token = `${token}${chance.integer({ min: 0, max: 9 })}`;
  }
  const admin = new User("admin@knowledgecafe.de", token, "admin");
  const { insertedId } = await admin.create();
  const name = "Admin";
  const username = "admin";
  const password = await hashPassword("test");
  await User.verify(insertedId.toString(), name, username, password);
  console.log("Admin seeded.");
  return admin;
};

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    const products = await seedProducts(productData);
    const events = await seedEvents(1);
    const orders = await seedOrders(products, events, 50);
    const admin = await seedAdmin();
    console.log("Database seeded.");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

seedDatabase();
