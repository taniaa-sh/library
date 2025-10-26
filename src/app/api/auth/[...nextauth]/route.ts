import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const client = await clientPromise
        const usersCollection = client.db("library").collection("users")

        const user = await usersCollection.findOne({ email: credentials.email })
        if (!user) return null

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
        if (!isPasswordValid) return null

        return { id: user._id.toString(), name: user.fullName, email: user.email }
      }
    })
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/auth/signin"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
