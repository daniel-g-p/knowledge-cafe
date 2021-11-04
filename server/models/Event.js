import { ObjectId } from "bson";
import { getDatabase } from "../utilities/database.js";

export default class Event {
  constructor() {
    this.title = "";
    this.start = new Date();
    this.end = null;
    this.stats = {
      revenue: 0,
      unitsSold: 0,
      products: {},
    };
  }
  async create() {
    const collection = getDatabase().collection("events");
    return await collection.insertOne(this);
  }
  static async getAll() {
    const collection = getDatabase().collection("events");
    const query = { end: { $ne: null }};
    return await collection.find(query).toArray();
  }
  static async findActive() {
    const collection = getDatabase().collection("events");
    return await collection.findOne({ end: null }, { projection: { _id: 1 } });
  }
  static async closeEvent(eventId, title, stats) {
    const collection = getDatabase().collection("events");
    const filter = { _id: new ObjectId(eventId) };
    const update = { $set: { title, stats, end: new Date() } };
    return await collection.updateOne(filter, update);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("events");
    return await collection.deleteMany({});
  }
}
