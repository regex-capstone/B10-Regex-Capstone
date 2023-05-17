import { NextAuthOptions } from "next-auth";
import User from "@/isaac/models/User";
import GoogleProvider from "../google/GoogleProvider";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { GetUserTypes } from "@/isaac/public/api/User";

const api = PublicAPIEndpoint;

export interface ComponentAuthOptions {
    role: string,
    unauthorized: string // redirect to this url
}

/**
 * All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
 */
export const AuthOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.AUTH_SECRET,
    providers: [
        GoogleProvider,
        // ...add more providers here
    ],
    callbacks: {
        // https://next-auth.js.org/configuration/callbacks
        async signIn({ user }) {
            const email = user.email as string;
            const u: User = await api.User.get(GetUserTypes.USER_BY_EMAIL, { email: email }) as User;

            return (!u) ? false : true;
        },

        async session({ session, token }) {
            session.name = token.name as string;
            session.picture = session.user?.image as string;
            
            return session;
        },
        
        async redirect({ url, baseUrl }) {
            return '/redirect';
        }
    }
}