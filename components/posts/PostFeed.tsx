import EditPostModal from '../modals/EditPostModal';

import PostItem from './PostItem';
import { connect } from 'react-redux';
import { getPosts } from '@/actions/postActions';
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners";

interface PostFeedProps {
  userId?: string;
  profile?: boolean;
  mode: number;
  posts: any [];
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, profile, mode, posts }) => {
  // const { data: posts = [] } = usePosts(userId);

  return (
    <div className=' my-4 mb-20'>
      <EditPostModal data={posts} />
      {posts.map((post: Record<string, any>,) => (
        <PostItem userId={userId} key={post.id} data={post} profile={profile} mode={mode} />
      ))}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps,mapDispatchToProps)(PostFeed);
