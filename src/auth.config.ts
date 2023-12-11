import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "./auth/sign",
    newUser: "./auth/new-account",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ session, token, user }) {
      console.log({ session, token, user });

      session.user = token.data as any;

      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log("AuthConfig.ts => ", { email, password });

        //Buscar correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        // Comparar contraseña
        if (!bcryptjs.compareSync(password, user.password)) return null;

        // Regresar el usuario

        // si pasa las validaciones pasara por los callbacks de next auth
        // retornasr todo menos el password

        const { password: _, ...rest } = user;

        console.log("rest usuario desde auth.config =>", rest);

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
