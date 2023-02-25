import { NextAuthOptions } from "next-auth";
import User from "@/isaac/models/User";
import GoogleProvider from "../google/GoogleProvider";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";

const api: API = ApiEndpoint;

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
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                // persist the user data in the token for the middleware
                token.user = await api.getUserByEmail(token.email as string);
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user as User;

            return session;
        },
        async redirect({ url, baseUrl }) {
            // @TODO: direct to the profile page?
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}