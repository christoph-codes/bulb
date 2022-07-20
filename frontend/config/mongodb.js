import { MongoClient } from "mongodb";

const db = async (collection) => {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    return client.db(process.env.MONGODB_NAME).collection(collection);
  } catch (error) {
    console.log("Mongo DB Error:", error);
  }
};

export default db;
