import { ObjectId } from "mongodb";

import { getDatabase } from "../utilities/database.js";

export default class User {
  constructor(email, token, role = "user") {
    this.email = email;
    this.role = role;
    this.name = "";
    this.username = "";
    this.password = "";
    this.token = {
      secret: token,
      expires: new Date().getTime() + 1000 * 60 * 60 * 24,
    };
    this.verified = false;
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
        verified: true,
      },
    };
    return await collection.updateOne(filter, update);
  }
  static async findVerified(projectionFields = []) {
    const collection = getDatabase().collection("users");
    const query = { verified: true };
    const options = { projection: {} };
    for (let field of projectionFields) {
      options.projection[field] = 1;
    }
    return await collection.find(query, options).toArray();
  }
  static async findById(userId, fields = ["_id"]) {
    const collection = getDatabase().collection("users");
    const query = { _id: new ObjectId(userId) };
    const options = { projection: {} };
    for (let field of fields) {
      options.projection[field] = 1;
    }
    return await collection.findOne(query, options);
  }
  static async findByUser(user) {
    const collection = getDatabase().collection("users");
    const query = { $or: [{ username: user }, { email: user }] };
    const options = { projection: { _id: 1, password: 1 } };
    return await collection.findOne(query, options);
  }
  static async updateById(userId, data) {
    const collection = getDatabase().collection("users");
    const query = { _id: new ObjectId(userId) };
    const update = { $set: data };
    return await collection.updateOne(query, update);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("users");
    return await collection.deleteMany({});
  }
}
