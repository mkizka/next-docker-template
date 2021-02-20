import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = (req, res) => {
  if (
    process.env.GOOGLE_CLIENT_ID === undefined ||
    process.env.GOOGLE_CLIENT_SECRET === undefined
  ) {
    throw new Error("Google認証情報が不足しています");
  }
  return NextAuth(req, res, {
    providers: [
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: Adapters.Prisma.Adapter({ prisma }),
  });
};

export default handler;
