import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import db from "./db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { formSchema } from "./validation"
import { v4 as uuid } from "uuid"
import { encode } from "next-auth/jwt"
import bcrypt from "bcryptjs"

const adapter = PrismaAdapter(db)

export const { auth, handlers, signIn } = NextAuth({
    adapter,

    providers: [GitHub, Google, Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async (credentials) => {  // ---> check users credentials

            const validatedCredentials = formSchema.parse(credentials)

            const user = await db.user.findFirst({
                where: {
                    email: validatedCredentials.email,
                }
            });

            console.log("user----------", user)

            // If user not found OR password is missing, return error
            if (!user) {
                console.log("user not found")
                throw new Error("Invalid credentials");
            }

            // Compare passwords using bcryptjs
            const passwordMatch = bcrypt.compareSync(validatedCredentials.password, user?.password);
            if (!passwordMatch) {
                console.log("hello")
                throw new Error("Invalid credentials");
            }

            return user;

        },

    })],

    callbacks: {
        async jwt({ token, account }) {
            if (account?.provider === "credentials") {
                token.credentials = true;
            }
            return token;
        }
    },

    jwt: {
        encode: async function (params) {
            if (params?.token?.credentials) {
                const sessionToken = uuid();

                if (!params.token.sub) {
                    throw new Error("No user ID is found in token");
                }

                const createSession = await adapter?.createSession?.({
                    sessionToken: sessionToken,
                    userId: params.token?.sub,
                    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                });

                if (!createSession) {
                    throw new Error("Failed to create session")
                }

                return sessionToken;
            }

            return encode(params)
        }
    }
});