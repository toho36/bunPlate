import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import { db } from "@/lib/db";
import { env } from "@/lib/env";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID!,
      clientSecret: env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID!,
      clientSecret: env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: Number(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcome email or perform other actions when a user is created
      console.log("New user created:", user.email);
    },
  },
};