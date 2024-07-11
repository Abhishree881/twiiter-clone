import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"
import { useEffect, useState } from "react";
import { getPosts } from "@/actions/postActions";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";

const Home: React.FC<{ mode: number, getPosts: () => void, firstLoad: boolean, loading:boolean, posts:any }> = ({ mode, getPosts, firstLoad,loading,posts }) => {
  useEffect(() => {
    if (firstLoad) {
      getPosts();
    }
  }, []);
  return (
    loading?
    <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
    </div>
    :
    <>
      <Header label="Home" mode={mode} />
      <Form placeholder="What's happening?" mode={mode} />
      <PostFeed mode={mode} posts={posts} />
    </>
  )
}

const mapStateToProps = (state: any) => ({
  posts: state.post.posts,
  firstLoad: state.post.firstLoad,
  loading: state.post.loading,
});

const mapDispatchToProps = {
  getPosts
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);
