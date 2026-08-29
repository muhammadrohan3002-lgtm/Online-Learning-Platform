import dns from "node:dns";
dns.setServers(["8.8.8.8","8.8.4.4"])
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable in your .env file");
}

const client = new MongoClient(uri);
const db = client.db("skillhphere");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        socialProviders: {
          github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          },
        },
      }
    : {}),
});