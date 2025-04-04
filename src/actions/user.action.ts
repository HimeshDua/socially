'use server';

import {prisma} from '@/lib/prisma';
import {auth, currentUser} from '@clerk/nextjs/server';

export async function syncUser() {
  try {
    const {userId} = await auth();
    const user = await currentUser();

    if (!user || !userId) {
      throw new Error('User not authenticated or userId not found');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    if (existingUser) return existingUser;

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ''} ${' '} ${user.lastName || ''}`,
        username:
          user.username ?? user.emailAddresses[0].emailAddress.split('@')[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl
      }
    });
    return dbUser;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw new Error('Failed to sync user data');
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    return prisma.user.findUnique({
      where: {clerkId:clerkId},
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error counting user data:', error);
    throw new Error('Failed to count user data');
  }
}

export async function getDbUserId() {
  const {userId: clerkId} = await auth();
  if (!clerkId) throw new Error('Unauthorized to access Post');

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error('User not found');

  return user.id;
}
