import NextAuth, { AuthOptions, DefaultSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "@/lib/mongodb"

declare module "next-auth" {
  interface Session {
    user: {
      role?: "admin" | "user"
    } & DefaultSession["user"]
  }
  interface User {
    role?: "admin" | "user"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "admin" | "user"
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        universityIDNumber: { label: "University ID", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.universityIDNumber) return null

        const client = await clientPromise
        const usersCollection = client.db("library").collection("users")

        const user = await usersCollection.findOne({
          email: credentials.email,
          universityId: credentials.universityIDNumber
        })

        if (!user) return null

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          role: user.role
        }
      }
    })
  ],
  session: { strategy: "jwt" as const },
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role
      return token
    },
    async session({ session, token }) {
      if (token && session.user) session.user.role = token.role
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
