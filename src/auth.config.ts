import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      // console.log(user, 'user');
      if (user) return true;

      return false;
    },
    async jwt({ token, user }) {
      // console.log(token, 'token');
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.token = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  providers: [],
} satisfies NextAuthConfig;
