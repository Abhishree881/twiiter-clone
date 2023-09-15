import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
  
    await serverAuth(req, res);

    const { body,id } = req.body;

    if (!body) {
      throw new Error('Missing fields');
    }

    const updatedUser = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        body: body,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}