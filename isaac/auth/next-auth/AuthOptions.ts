// import { Component } from "react";
// @TODO: make loading component

import { callMsGraph } from "@/isaac/auth/azure/MSGraph";
import AzureADProvider from "next-auth/providers/azure-ad";
import { Component } from "react";
import { NextAuthOptions } from "next-auth";
import { UserRole } from "@/isaac/models/User";

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
    AzureADProvider({
        clientId: process.env.AZURE_AD_CLIENT_ID as string,
        /** Note: client secret will expire in 180 days from 2/21/2022 */
        clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
        tenantId: process.env.AZURE_AD_TENANT_ID as string,
        authorization: {
            params: {
                scope:
                    'openid profile User.Read'
            }
        }
    }),
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
        
        const profile = await callMsGraph(session.accessToken);

        // @TODO handle admin check
        session.user = {
            role: UserRole.STUDENT,
            givenName: profile.givenName,
            title: profile.jobTitle
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