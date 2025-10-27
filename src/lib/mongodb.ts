import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {

  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ||
  (global._mongoClientPromise = new MongoClient(uri).connect());

export default clientPromise;
