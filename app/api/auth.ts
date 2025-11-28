// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "../../libs/db"; // Adjust path as needed
import { RowDataPacket } from "mysql2";
// ... all your other imports and type declarations ...
import { AuthOptions, DefaultSession, DefaultUser } from "next-auth";

// --- Type Extensions ---
declare module "next-auth" {
  // ... your type extensions for User and Session ...
  interface User extends DefaultUser {
    id: string;
    // Add 'role' here if you want it typed on the user object
    role?: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      // Add 'role' here too
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string; // Add role to the JWT payload
  }
}
// -----------------------

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      // ... your Credentials provider logic ...
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ... your database logic ...
        if (!credentials?.email || !credentials?.password) return null;
        const [users] = await pool.query(
          `SELECT * FROM users WHERE email = ?`,
          [credentials.email]
        );
        const UserFetch = users as RowDataPacket;

        if (UserFetch.length === 0) return null;

        const user = UserFetch[0] as any;
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.type, // IMPORTANT: Including role from DB
        };
      },
    }),
  ],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user role and ID to the JWT payload
      if (user) {
        token.id = user.id;
        token.role = (user as any).role; // Cast user to include the role
      }
      return token;
    },
    async session({ session, token }) {
      // Assign the role and ID from the JWT payload to the session
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// EXPORT THE NEXTAUTH HANDLER WRAPPED WITH THE CONFIGURATION
export const { handlers, signIn, signOut } = NextAuth(authOptions);
