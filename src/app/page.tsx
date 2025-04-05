import {getPosts} from '@/actions/post.action';
import {getDbUserId} from '@/actions/user.action';
import CreatPost from '@/components/CreatPost';
import FollowSuggestions from '@/components/FollowSuggestions';
import PostCard from '@/components/PostCard';
import {currentUser} from '@clerk/nextjs/server';

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  console.log('posts', posts);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">
          {user ? <CreatPost /> : null}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} dbUserId={dbUserId} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-4 sticky top-20">
          <FollowSuggestions />
        </div>
      </div>
    </>
  );
}
