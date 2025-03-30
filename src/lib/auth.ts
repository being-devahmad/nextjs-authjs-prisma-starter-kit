import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const { auth, handlers, signIn } = NextAuth({
    providers: [GitHub, Google, Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize: async (credentials) => {
            const email = 'admin@admin.com';
            const password = '1234';

            if (credentials.email === email && credentials.password === password) {
                return { email, password }
            } else {
                throw new Error("invalid credentials")
            }

        }, // check users credentials

    })]
})