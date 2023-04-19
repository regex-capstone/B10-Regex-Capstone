import { NextAuthOptions } from "next-auth";
import User, { UserMajor, UserRole } from "@/isaac/models/User";
import GoogleProvider from "../google/GoogleProvider";
import PublicAPIEndpoint from "@/isaac/public/PublicAPI";
import { UserStanding } from '../../models/User';
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
        async jwt({ token, account }) {
            if (account) {
                const accessToken = account.access_token;
                const name = token.name as string;
                const email = token.email as string;

                let user: User = await api.User.get(GetUserTypes.USER_BY_EMAIL, { email: email });
                
                // TODO: rehandle user shit
                if (!user) {    // new user!
                    const newUser = await api.User.add({
                        name: name,
                        email: email,
                        role: UserRole.STUDENT,
                        standing: UserStanding.UNKNOWN,
                        major: UserMajor.UNKNOWN,
                    });

                    if (!newUser) throw new Error('Error adding new user.');
                }

                token.email = email;
                token.accessToken = accessToken;
                token.name = user.name;
                token.isAdmin = user.role === UserRole.ADMIN;
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.picture = token.picture ?? '';
            session.isAdmin = token.isAdmin as boolean;
            session.name = token.name as string;
            
            return session;
        },
        async redirect({ url, baseUrl }) {
            return '/redirect';
        }
    }
}