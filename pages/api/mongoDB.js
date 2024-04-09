import { MongoClient } from "mongodb";

export default async function connection() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  await client.connect();
  return client;
}
