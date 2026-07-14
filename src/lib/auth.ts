import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI;
if (!mongoUri) throw new Error("MONGO_DB_URI environment variable is not set");

const client = new MongoClient(mongoUri);
const db: Db = client.db("EventHive");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});