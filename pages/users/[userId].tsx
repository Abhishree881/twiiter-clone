import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { getUserPosts } from "@/actions/postActions";
import { useEffect, useState } from "react";
import { connect } from "react-redux";



const UserView: React.FC<{ mode: number, getUserPosts: (userId: string) => void, userPosts: any}> = ({ mode, getUserPosts, userPosts }) => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  useEffect(() => {
    getUserPosts(userId as string);
  }, [userId]);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header mode={mode} showBackArrow label={fetchedUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio mode={mode} userId={userId as string} />
      <PostFeed mode={mode} userId={userId as string} profile={true} posts={userPosts} />
    </>
  );
}

const mapStateToProps = (state: any) => ({
  isLoading: state.post.loading,
  userPosts: state.post.userPosts,
});

const mapDispatchToProps = {
  getUserPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);