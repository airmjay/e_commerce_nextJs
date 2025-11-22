import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "../../../../libs/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const [users] = await pool.query(
                    `SELECT * FROM users WHERE id = ?`,
                    [credentials.email]
                );
                return users;
                if (users.length === 0) return null;

                const user = users[0] as any;
                const isValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token.id) session.user.id = token.id as string;
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});
