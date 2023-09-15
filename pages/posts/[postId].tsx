import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/usePost";

import Header from "@/components/Header";
import Form from "@/components/Form";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";


const PostView: React.FC<{ mode: number }> = ({ mode }) => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return (
    <>
      <Header mode={mode} showBackArrow label="Tweet" />
      <PostItem mode={mode} data={fetchedPost} />
      <Form mode={mode} postId={postId as string} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
}

export default PostView;