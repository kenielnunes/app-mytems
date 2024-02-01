// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../orm/prisma-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const user = await prisma.user.findMany();

    res.status(200).json({ ...user, message: "usuarios" });
  }

  if (req.method === "POST") {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });

    res.status(201).json(user);
  }
}
