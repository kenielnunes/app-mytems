// pages/api/auth/[...nextauth].ts
import { userAuth } from "@/services/api/modules/auth/send-auth-magic-link";
import { randomBytes, randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

import NextAuth from "next-auth";
import SteamProvider from "next-auth-steam";

const DEV_CALLBACK_URL = "http://localhost:3000/api/auth/callback";
const PROD_CALLBACK_URL = "https://app-mytems.vercel.app/api/auth/callback";

const ENVRONMENT_CALLBACK_URL =
  process.env.NODE_ENV === "production" ? PROD_CALLBACK_URL : DEV_CALLBACK_URL;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-expect-error
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
      jwt({ token, user }) {
        return { ...token, ...user };
      },
      async signIn({ user, account, profile }) {
        const profileSteam = profile as any;
        try {
          console.log(profileSteam);

          const auth = await userAuth(user.email ?? "");

          console.log(auth);

          if (auth.acessToken) {
            return true;
          }
        } catch (error: any) {
          if (account?.provider === "steam") {
            // const createdUser = await createUser({
            //   origin: "STEAM",
            //   email: user.email ?? "",
            //   name: user.name ?? "",
            // });

            // console.log(createdUser);

            return true; // Return true to allow sign in
          }
        }
      },

      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;

          return session;
        }

        if (session.user) {
          return session;
        }
      },
    },
    secret: "81375eb56b0b263990f0ea1233a57796",
  });
}
