import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const fullName = formData.get("fullName")?.toString()
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const universityId = formData.get("universityId")?.toString()
  const idCard = formData.get("idCard")

  if (!fullName || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  return NextResponse.json({ message: "User created successfully" })
}
