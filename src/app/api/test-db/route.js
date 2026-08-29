import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json(
      { success: false, error: "MONGO_URI is missing in .env" },
      { status: 500 }
    );
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db("skillhphere");
    await db.command({ ping: 1 });
    await client.close();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
      database: "skillhphere",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to connect to MongoDB",
      },
      { status: 500 }
    );
  }
}
