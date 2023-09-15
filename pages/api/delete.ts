import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { id } = req.body;
      
    const deletedPost = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}