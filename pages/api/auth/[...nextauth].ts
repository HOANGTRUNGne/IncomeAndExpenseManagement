import NextAuth, { NextAuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        KeycloakProvider({
            clientId: 'nextjs-auth-test',
            clientSecret: 'PWWlt0XrA4vAFqaoZOctDB5w5AETpvUu',
            issuer: 'https://auth.tasoft.dev/realms/master',
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
};

export default NextAuth(authOptions);
