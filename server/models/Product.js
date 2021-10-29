import { getDatabase } from "../utilities/database.js";

export default class Product {
  constructor(name, tag, price, description, variations) {
    this.name = name;
    this.tag = tag;
    this.price = price;
    this.description = description;
    this.variations = variations.map((item) => {
      return {
        id: item.trim().replaceAll(" ", "-"),
        label: item,
        unitsSold: 0,
      };
    });
    this.totalRevenue = 0;
    this.unitsSold = 0;
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
