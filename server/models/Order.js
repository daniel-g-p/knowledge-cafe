import { getDatabase } from "../utilities/database.js";

export default class Order {
  constructor(eventId, customerName, comments, items, paymentMethod, total) {
    this.eventId = eventId;
    this.customerName = customerName;
    this.comments = comments;
    this.items = items;
    this.paymentMethod = paymentMethod;
    this.total = total;
    this.completed = false;
    this.timestamp = new Date();
  }
  async create() {
    const collection = getDatabase().collection("orders");
    return await collection.insertOne(this);
  }
  static async getPending(eventId) {
    const collection = getDatabase().collection("orders");
    const query = { completed: false, eventId };
    return await collection.find(query).toArray();
  }
  static async deleteAll() {
    const collection = getDatabase().collection("orders");
    return await collection.deleteMany({});
  }
}
