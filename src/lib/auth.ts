import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { validateAdmin } from "@/lib/admin/credentials";

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@nomadic.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const admin = await validateAdmin(
          credentials.email as string,
          credentials.password as string
        );

        if (admin) {
          return {
            id: admin.id,
            email: admin.email,
            name: admin.name,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  trustHost: true,
});

export { handlers, auth, signIn, signOut };
