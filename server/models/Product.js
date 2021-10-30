import { getDatabase } from "../utilities/database.js";

export default class Product {
  constructor(name, tag, price, description, variations) {
    this.name = name;
    this.tag = tag;
    this.price = price;
    this.description = description;
    this.variations = variations;
    this.stats = {
      revenue: 0,
      unitsSold: 0,
      variations: variations.map((item) => {
        return { name: item, sold: 0 };
      }),
    };
    this.timestamp = new Date();
  }
  async create() {
    const collection = getDatabase().collection("products");
    return await collection.insertOne(this);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("products");
    return await collection.deleteMany({});
  }
}
