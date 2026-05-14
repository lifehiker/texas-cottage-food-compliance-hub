import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";

import { getDb } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email";

const demoSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(60).optional(),
});

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  return {
    adapter: PrismaAdapter(getDb()),
    trustHost: true,
    secret:
      process.env.AUTH_SECRET ??
      process.env.NEXTAUTH_SECRET ??
      "forge-local-auth-secret",
    session: { strategy: "jwt" },
    pages: {
      signIn: "/login",
    },
    providers: [
      Credentials({
        name: "Workspace access",
        credentials: {
          email: { label: "Email", type: "email" },
          name: { label: "Name", type: "text" },
        },
        async authorize(raw) {
          const parsed = demoSchema.safeParse(raw);

          if (!parsed.success) {
            return null;
          }

          const db = getDb();
          const { email, name } = parsed.data;
          const existing = await db.user.findUnique({ where: { email } });

          if (existing) {
            return existing;
          }

          return db.user.create({
            data: {
              email,
              name: name || email.split("@")[0],
            },
          });
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.role = user.role;
        }

        return token;
      },
      async session({ session, token }) {
        const userId = typeof token.id === "string" ? token.id : null;

        if (!userId) {
          return session;
        }

        const purchase = await getDb().purchase.findFirst({
          where: { userId, status: "active" },
          orderBy: { updatedAt: "desc" },
        });

        session.user.id = userId;
        session.user.role = typeof token.role === "string" ? token.role : "seller";
        session.user.plan = purchase?.plan || "free";
        return session;
      },
    },
    events: {
      async createUser({ user }) {
        if (!user.email) {
          return;
        }

        await sendTransactionalEmail({
          to: user.email,
          subject: "Welcome to Texas Cottage Food Compliance Hub",
          html: "<p>Your workspace is ready. You can now save labels, track checklists, and reuse Texas-specific templates.</p>",
        });
      },
    },
  };
});
