// pages/api/auth/[...nextauth].ts
import { randomBytes, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

import NextAuth from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.NEXT_PUBLIC_STEAM_SECRET!,
        callbackUrl: "https://app-mytems.vercel.app/api/auth/callback",
      }),
    ],
    session: {
      generateSessionToken: () => {
        return randomUUID?.() ?? randomBytes(32).toString("hex");
      },
    },
    callbacks: {
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }

        return token;
      },
      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
    },
    secret: "81375eb56b0b263990f0ea1233a57796",
  });
}
