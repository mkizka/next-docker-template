import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const handler: NextApiHandler = (req, res) => {
  if (
    process.env.TWITTER_CLIENT_ID === undefined ||
    process.env.TWITTER_CLIENT_SECRET === undefined
  ) {
    throw new Error("Twitter認証情報が不足しています");
  }
  return NextAuth(req, res, {
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
      }),
    ],
    adapter: PrismaAdapter(prisma),
  });
};

export default handler;
