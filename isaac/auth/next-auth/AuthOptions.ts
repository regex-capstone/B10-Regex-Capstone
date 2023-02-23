// import { Component } from "react";
// @TODO: make loading component

import { Component } from "react";
import { NextAuthOptions } from "next-auth";
import { UserRole } from "@/isaac/models/User";
import GoogleProvider from "../google/GoogleProvider";

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
                token.accessToken = account.access_token
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;

            // // @TODO handle admin check
            session.user = {
                role: UserRole.STUDENT as UserRole,
                name: token.name as string
            }

            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
}