import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "../../../../libs/db";
import { RowDataPacket } from "mysql2";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// --- START: TYPE AUGMENTATIONS (CORRECTED) ---

declare module "next-auth" {
  /**
   * Extends the built-in User type to include 'id' and 'role'.
   */
  interface User extends DefaultUser {
    id: string;
    role?: string; // <-- Added role here
  }

  /**
   * Extends the built-in Session type to include 'id' and 'role' on the user object.
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string; // <-- Added role here
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT type to include 'id' and 'role'.
   */
  interface JWT {
    id: string;
    role?: string; // <-- Added role here
  }
}

// --- END: TYPE AUGMENTATIONS (CORRECTED) ---

const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user from the database
        const [users] = await pool.query(
          `SELECT * FROM users WHERE email = ?`,
          [credentials.email]
        );
        const UserFetch = users as RowDataPacket;

        if (UserFetch.length === 0) return null;

        const user = UserFetch[0] as any;

        // Compare password hash
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        // Return the user object, including the role property
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.type, // user.type is mapped to role
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    // --- START: CALLBACKS (CORRECTED) ---
    async jwt({ token, user }) {
      // 'user' is present only on initial sign-in
      if (user) {
        token.id = user.id;
        // FIX: Copy the role property from the new User object to the JWT token
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Copy properties from the token (which is persisted) to the session object
      if (session.user) {
        if (token.id) {
          session.user.id = token.id as string;
        }
        // FIX: Copy the role property from the JWT token to the Session user object
        if (token.role) {
          session.user.role = token.role as string;
        }
      }
      return session;
    },
    // --- END: CALLBACKS (CORRECTED) ---
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth handler creation
const handler = NextAuth(authOptions);

// Export handlers for Next.js App Router
export { handler as GET, handler as POST };
