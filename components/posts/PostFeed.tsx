import usePosts from '@/hooks/usePosts';
import EditPostModal from '../modals/EditPostModal';

import PostItem from './PostItem';

interface PostFeedProps {
  userId?: string;
  profile?: boolean;
  mode: number;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, profile, mode }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <div className=' my-4 mb-20'>
      <EditPostModal data={posts} />
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} profile={profile} mode={mode} />
      ))}
    </div>
  );
};

export default PostFeed;
