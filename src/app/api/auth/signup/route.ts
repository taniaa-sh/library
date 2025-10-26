import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import * as bcrypt from "bcrypt"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const fullName = formData.get("fullName")?.toString()
    const email = formData.get("email")?.toString()
    const password = formData.get("password")?.toString()
    const universityId = formData.get("universityId")?.toString()

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const client = await clientPromise
    const usersCollection = client.db("library").collection("users")

    const existingUser = await usersCollection.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    await usersCollection.insertOne({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      createdAt: new Date(),
    })

    return NextResponse.json({ message: "User created" })
  } catch (error) {
    console.error("Signup API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
