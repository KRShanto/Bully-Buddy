import "server-only";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { CredentialsSignin } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import { db } from "../lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.SECRET!,
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "light",
  },

  providers: [
    CredentialsProvider({
      name: "AutoWorx",
      credentials: {
        email: { label: "Your Email", type: "email" },
        password: { label: "Your Password", type: "password" },
      },

      // Login the user
      // @ts-ignore
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };

          if (!email || !password) return null;

          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user) return null;

          // if no password is set, it means the user is using a social account
          if (!user.password) return null;

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordMatched) return null;

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.email = token.email;
      }
      return session;
    },

    async jwt({ token, user }) {
      // find the user
      const dbUser = await db.user.findUnique({
        where: { email: token.email! },
      });

      if (!dbUser) {
        token.id = user.id;
        return token;
      }

      return {
        ...token,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
      };
    },
  },
});
