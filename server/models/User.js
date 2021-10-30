import { getDatabase } from "../utilities/database.js";

export default class User {
  constructor(name, email, status) {
    this.name = name;
    this.email = email;
    this.status = status;
    this.username = undefined;
    this.password = undefined;
    this.passwordReset = {
      token: undefined,
      expires: undefined,
    };
    this.timestamp = new Date();
  }
  async create() {
    const collection = getDatabase().collection("users");
    return await collection.insertOne(this);
  }
  static async deleteAll() {
    const collection = getDatabase().collection("users");
    return await collection.deleteMany({});
  }
}
