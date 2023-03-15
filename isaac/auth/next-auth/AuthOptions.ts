import { NextAuthOptions } from "next-auth";
import User, { UserMajor, UserRole } from "@/isaac/models/User";
import GoogleProvider from "../google/GoogleProvider";
import API from "@/isaac/api/APIInterface";
import ApiEndpoint from "@/isaac/api/APIEndpoint";
import { UserStanding } from '../../models/User';

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
                const accessToken = account.access_token;
                const name = token.name as string;
                const email = token.email as string;
                
                // persist the user data in the token for the middleware
                let user: User = await api.getUserByEmail(email);
                
                if (!user) {
                    // @TODO: handle this better
                    // @TODO: handle admin side
                    const newUser = await api.addNewUser({
                        name: name,
                        email: email,
                        role: UserRole.STUDENT,
                        standing: UserStanding.UNKNOWN,
                        major: UserMajor.UNKNOWN,
                    });

                    if (!newUser) throw new Error('Error adding new user.');

                    user = newUser;
                }

                token.user = user;
                token.accessToken = accessToken;
            }

            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.picture = token.picture ?? '';
            session.user = token.user as User;

            return session;
        },
        async redirect({ url, baseUrl }) {
            return '/redirect';
        }
    }
}