import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

let database;

export const connectToDatabase = async () => {
  const client = new MongoClient(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  await client.connect();
  database = client.db("knowledge-cafe");
};

export const getDatabase = () => database;
