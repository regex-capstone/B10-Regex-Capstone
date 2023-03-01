import "next-auth/jwt"
import User from "@/isaac/models/User"
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User,
    accessToken: string | undefined,
    picture: string | undefined
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | undefined,
  }
}