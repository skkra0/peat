import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from '@/lib/prisma';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/'
    },
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user.email!
                }
            });
            
            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        email: user.email!
                    }
                })
            }

            return true;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
            }
            return session;
        },

        redirect() {
            return '/';
        },

        async authorized ({ auth }) {
            return !!auth;
        }
    }
});