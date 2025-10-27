import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, universityId } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const usersCollection = client.db("library").collection("users")

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    await usersCollection.insertOne({
      fullName,
      email,
      universityId,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error("Signup API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}