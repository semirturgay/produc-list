import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: '911340538252-be59uuvcto952esj24arvc7m16bt0knk.apps.googleusercontent.com',
            clientSecret: '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'
        }),
    ],
    secret: '2053237909'
})
