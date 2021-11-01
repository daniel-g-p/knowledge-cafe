import Chance from "chance";

import { connectToDatabase } from "./utilities/database.js";
import Product from "./models/Product.js";
import Event from "./models/Event.js";
import OrderItem from "./models/OrderItem.js";
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
    const event = new Event(chance.word());
    await event.create();
    events.push(event);
  }
  console.log("Events seeded.");
  return events;
};

const seedOrders = async (products, events, ordersPerEvent) => {
  await Order.deleteAll();
  const paymentMethods = ["cash", "card", "paypal"];
  const orders = [];
  for (let event of events) {
    for (let i = 0; i < ordersPerEvent; i++) {
      const numberOfItems = chance.integer({ min: 1, max: 3 });
      const items = [];
      for (let j = 0; j < numberOfItems; j++) {
        const product =
          products[chance.integer({ min: 0, max: products.length - 1 })];
        const variation = product.variations.length
          ? product.variations[
              chance.integer({ min: 0, max: product.variations.length - 1 })
            ]
          : undefined;
        const item = new OrderItem(
          product._id.toString(),
          chance.integer({ min: 1, max: 2 }),
          variation
        );
        items.push(item);
      }
      const order = new Order(
        event._id.toString(),
        chance.first(),
        chance.bool() ? chance.sentence() : null,
        items,
        paymentMethods[
          chance.integer({ min: 0, max: paymentMethods.length - 1 })
        ],
        items.reduce((result, item) => {
          const { price } = products.find(
            (product) => product._id.toString() === item.productId
          );
          return result + price * item.quantity;
        }, 0)
      );
      await order.create();
      orders.push(order);
    }
  }
  console.log("Orders seeded.");
  return orders;
};

const seedUsers = async (numberOfUsers) => {
  await User.deleteAll();
  const users = [];
  const adminUser = new User("Admin", "admin@knowledgecafe.de", "admin");
  await adminUser.create();
  users.push(adminUser);
  for (let i = 0; i < numberOfUsers; i++) {
    const user = new User(
      chance.first(),
      chance.email({ domain: "knowledgecafe.de" }),
      "member"
    );
    await user.create();
    users.push(user);
  }
  console.log("Users seeded.");
  return users;
};

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    const products = await seedProducts(productData);
    const events = await seedEvents(1);
    const orders = await seedOrders(products, events, 50);
    const users = await seedUsers(5);
    console.log("Database seeded.");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

seedDatabase();
