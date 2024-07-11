import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    console.log("received request");
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updatedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      // Check if the currentUser.id already exists in likedIds to prevent duplication
      if (!updatedLikedIds.includes(currentUser.id)) {
        updatedLikedIds.push(currentUser.id);
        
        // Async notification creation
        createNotification(post.userId);
      }
    }

    if (req.method === 'DELETE') {
      updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likedIds: updatedLikedIds }
    });
    console.log("updated post");
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

// Function to create a notification asynchronously
async function createNotification(userId: string) {
  if (userId) {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.notification.create({
          data: {
            body: 'Someone liked your tweet!',
            userId: userId
          }
        });

        await tx.user.update({
          where: { id: userId },
          data: { hasNotification: true }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
