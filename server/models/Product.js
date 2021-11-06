import { ObjectId } from "mongodb";
import { getDatabase } from "../utilities/database.js";

export default class Product {
  constructor(name, tag, price, description, variations = []) {
    this.name = name;
    this.tag = tag;
    this.price = price;
    this.description = description;
    this.variations = variations;
    this.stats = {
      revenue: 0,
      unitsSold: 0,
      variations: {},
    };
    for (let variation of variations) {
      this.stats.variations[variation] = 0;
    }
    this.timestamp = new Date();
  }
  async create() {
    const collection = getDatabase().collection("products");
    return await collection.insertOne(this);
  }
  static async getAll(keys = []) {
    const collection = getDatabase().collection("products");
    const options = { projection: {} };
    for (let key of keys) {
      options.projection[key] = 1;
    }
    return await collection.find({}, options).toArray();
  }
  static async getById(productId, keys = []) {
    const collection = getDatabase().collection("products");
    const query = { _id: new ObjectId(productId) };
    const options = { projection: {} };
    for (let key of keys) {
      options.projection[key] = 1;
    }
    return await collection.findOne(query, options);
  }
  static async getTagById(productId) {
    const collection = getDatabase().collection("products");
    const query = { _id: new ObjectId(productId) };
    const options = { projection: { tag: 1 } };
    return await collection.findOne(query, options);
  }
  static async updateById(productId, data) {
    const collection = getDatabase().collection("products");
    const filter = { _id: new ObjectId(productId) };
    const update = { $set: data };
    return await collection.updateOne(filter, update);
  }
  static async deleteById(productId) {
    const collection = getDatabase().collection("products");
    const query = { _id: new ObjectId(productId) };
    return await collection.deleteOne(query);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("products");
    return await collection.deleteMany({});
  }
}
