import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { clearPost, getPost } from "@/actions/postActions";


const PostView: React.FC<{ mode: number, posts: any, getPost: (postId: string) => void, post: any, clearPost: () => void }> = ({ mode, posts, getPost, post, clearPost }) => {
  const router = useRouter();
  const [postId, setPostId] = useState<string | null>(null);
  const [postItem, setPostItem] = useState<any>({});


  useEffect(() => {
    const idFromQuery = router.query.postId;
    clearPost();
    if (idFromQuery) {
      setPostId(idFromQuery as string);
    } else {
      const pathParts = window.location.pathname.split('/');
      const idFromPath = pathParts[pathParts.length - 1];
      setPostId(idFromPath);
    }
  }, [router.query.postId]);

  const [fetchedPost, setFetchedPost] = useState<any>({});
  useEffect(() => {
    if(postId){
      getPost(postId as string)
      const post = posts.find((post: any) => post.id === postId)
      setPostItem(post)
    }
  }, [postId , posts])

  useEffect(() => {
    setFetchedPost(post)
  }, [post])
  

  // const { data: fetchedPost, isLoading } = usePost(postId as string);

  // if (isLoading || !fetchedPost) {
  //   return (
  //     <div className="flex justify-center items-center h-full">
  //       <ClipLoader color="lightblue" size={80} />
  //     </div>
  //   )
  // }

  return (
    Object.keys(fetchedPost).length===0 ?
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
      :
      <>
        <Header mode={mode} showBackArrow label="Tweet" />
        <PostItem mode={mode} data={postItem || fetchedPost} />
        <Form mode={mode} postId={postId as string} isComment placeholder="Tweet your reply" />
        <CommentFeed comments={fetchedPost?.comments} />
      </>
  );
}

const mapStateToProps = (state: any) => ({
  posts: state.post.posts,
  post: state.post.post,
});

const mapDispatchToProps = {
  getPost,
  clearPost
};

export default connect(mapStateToProps, mapDispatchToProps)(PostView);;