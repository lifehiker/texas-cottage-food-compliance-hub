import NextAuth from "next-auth";
import type { Provider } from "@auth/core/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";

import { getDb } from "@/lib/db";
import { sendTransactionalEmail } from "@/lib/email";

const demoSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(60).optional(),
});

function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export const { auth, handlers, signIn, signOut } = NextAuth(() => {
  const providers: Provider[] = [
    Credentials({
      name: "Demo access",
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
  ];

  if (googleConfigured()) {
    providers.unshift(
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    );
  }

  return {
    adapter: PrismaAdapter(getDb()),
    session: { strategy: "jwt" },
    pages: {
      signIn: "/pricing",
    },
    providers,
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
