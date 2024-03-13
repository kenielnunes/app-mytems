// pages/api/auth/[...nextauth].ts
import { randomBytes, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

import NextAuth from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";

const DEV_CALLBACK_URL = "http://localhost:3001/api/auth/callback";
const PROD_CALLBACK_URL = "https://app-mytems.vercel.app/api/auth/callback";

const ENVRONMENT_CALLBACK_URL =
  process.env.NODE_ENV === "production" ? PROD_CALLBACK_URL : DEV_CALLBACK_URL;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.NEXT_PUBLIC_STEAM_SECRET!,
        callbackUrl: ENVRONMENT_CALLBACK_URL,
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
