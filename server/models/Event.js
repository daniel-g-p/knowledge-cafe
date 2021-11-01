import { getDatabase } from "../utilities/database.js";

export default class Event {
  constructor(title) {
    this.title = title;
    this.start = new Date();
    this.end = undefined;
    this.stats = {
      revenue: 0,
      unitsSold: 0,
      products: {},
      paymentMethods: {},
    };
  }
  async create() {
    const collection = getDatabase().collection("events");
    return await collection.insertOne(this);
  }
  static async findActive() {
    const collection = getDatabase().collection("events");
    return await collection.findOne({ end: null }, { projection: { _id: 1 } });
  }
  static async deleteAll() {
    const collection = getDatabase().collection("events");
    return await collection.deleteMany({});
  }
}
