import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

// https://yuyao.me/posts/next-prisma-auth-tutorial
let prisma;

declare global {
  namespace NodeJS {
    interface Global {
      prisma: any;
    }
  }
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

if (
  process.env.GOOGLE_CLIENT_ID === undefined ||
  process.env.GOOGLE_CLIENT_SECRET === undefined
) {
  throw new Error("Google認証情報が不足しています");
}

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
};

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default handler
