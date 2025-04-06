// import { title } from 'process';
import {
  getProfileByUsername,
  getUserLikedPosts,
  getUserPosts,
  isFollowing
} from '@/actions/profile.action';
import {notFound} from 'next/navigation';
import ProfilePageClient from './ProfilePageClient';

export async function generateMetadata({params}: {params: {username: string}}) {
  const user = await getProfileByUsername(params.username);
  if (!user) return;
  return {
    title: `${user.name} @${user.username}`,
    description: user.bio || 'No bio available',
    openGraph: {
      title: `${user.name} (@${user.username})`,
      description: user.bio || 'No bio available',
      url: `https://socially-hems.vercel.com/profile/${params.username}`,
      images: [
        {
          url:
            user.image || 'https://socially-hems.vercel.com/default-image.jpg',
          width: 800,
          height: 600
        }
      ]
    }
  };
}

interface PageProps {
  params: {
    username: string;
  };
}

async function ProfilePageServer({params}: {params: PageProps['params']}) {
  const user = await getProfileByUsername(params.username);

  if (!user) notFound();

  const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id)
  ]);

  return (
    <ProfilePageClient
      user={user}
      posts={posts}
      likedPosts={likedPosts}
      isFollowing={isCurrentUserFollowing}
    />
  );
}
export default ProfilePageServer;
