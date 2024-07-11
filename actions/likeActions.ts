import axios from "axios";
import { toast } from "react-hot-toast";
import { refreshPost } from "./postActions";

export const likePost = (postId: string, hasLiked: boolean, userId: string) => {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const post = state.post.posts.find((post: any) => post.id === postId);
    const updatedLikedIds = hasLiked
      ? post.likedIds.filter((id: string) => id !== userId)
      : [...post.likedIds, userId];
    const updatedPost = {
      ...post,
      likedIds: updatedLikedIds,
    };
    const updatedPosts = state.post.posts.map((post: any) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    dispatch({
      type: "REFRESH_POSTS",
      payload: updatedPosts,
    });
    toast.success(!hasLiked ? "Liked" : "Unliked");
    let request;

    if (hasLiked) {
      request = () => axios.delete("/api/like", { data: { postId } });
    } else {
      request = () => axios.post("/api/like", { postId });
    }
    request().then(() => dispatch(refreshPost()));
  };
};
