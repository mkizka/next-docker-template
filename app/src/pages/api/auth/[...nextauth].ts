import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "~/lib/env";
import { prisma } from "~/lib/prisma";

const handler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, {
    providers: [
      TwitterProvider({
        clientId: env.TWITTER_CLIENT_ID,
        clientSecret: env.TWITTER_CLIENT_SECRET,
      }),
    ],
    secret: env.SECRET,
    adapter: PrismaAdapter(prisma),
  });
};

export default handler;
