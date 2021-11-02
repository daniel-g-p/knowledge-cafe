import { ObjectId } from "mongodb";

import { getDatabase } from "../utilities/database.js";

export default class User {
  constructor(email, token, status = "user") {
    this.email = email;
    this.status = status;
    this.name = "";
    this.username = "";
    this.password = "";
    this.token = {
      secret: token,
      expires: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    this.timestamp = new Date();
  }
  async create() {
    const collection = getDatabase().collection("users");
    return await collection.insertOne(this);
  }
  static async verify(userId, name, username, password) {
    const collection = getDatabase().collection("users");
    const filter = { _id: new ObjectId(userId) };
    const update = {
      $set: {
        name,
        username,
        password,
        token: { secret: "", expires: null },
      },
    };
    return await collection.updateOne(filter, update);
  }
  static async findById(userId) {
    const collection = getDatabase().collection("users");
    const query = { _id: new ObjectId(userId) };
    const options = { projection: { _id: 1 } };
    return await collection.findOne(query, options);
  }
  static async findByUser(user) {
    const collection = getDatabase().collection("users");
    const query = { $or: [{ username: user }, { email: user }] };
    const options = { projection: { _id: 1, password: 1 } };
    return await collection.findOne(query, options);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("users");
    return await collection.deleteMany({});
  }
}
