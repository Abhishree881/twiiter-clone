import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useLike from '@/hooks/useLike';

import Avatar from '../Avatar';
import useEditPostModal from "@/hooks/useEditPostModal";
import Button from "../Button";

import EditPostModal from '../modals/EditPostModal';

import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from 'react-icons/fa';

import Image from "next/image";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
  profile?: boolean;
  mode: number;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId, profile, mode }) => {

  const router = useRouter();
  const loginModal = useLoginModal();

  const editPostModal = useEditPostModal();

  const { data: currentUser } = useCurrentUser();
  // console.log(currentUser.id + " hello " + userId);

  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  const [isLoading, setIsLoading] = useState(false);

  const id = data.id;

  const handleClick = useCallback(async (ev: any) => {
    ev.stopPropagation();
    try {
      setIsLoading(true);

      await axios.delete('/api/delete', { data: { id } });

      toast.success('Deleted');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [id]);


  return (
    <>
      <EditPostModal data={data} />
      <div
        onClick={goToPost}
        style={{ zIndex: 0 }}
        className={`
        posts
        ${mode ? 'posts-light' : 'posts-dark'}
        p-5 
        cursor-pointer 
        hover:bg-neutral-700 
        hover:bg-opacity-10
        transition
        `}>
        <div className="flex flex-row items-start gap-3">
          <Avatar userId={data.user.id} />
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", justifyContent: 'space-between', flexDirection: "row", width: "100%" }}>
              <div className="flex flex-row items-center gap-2">
                <p
                  onClick={goToUser}
                  className=" 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
                  {data.user.name}
                </p>
                <span
                  onClick={goToUser}
                  className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
                  @{data.user.username}
                </span>
                <span className="text-neutral-500 text-sm">
                  {createdAt}
                </span>


                {/* <Button secondary label="Edit" onClick={editPostModal.onOpen} /> */}
              </div>
              {profile && currentUser?.id === userId ? (
                <div style={{ gap: "10px", display: "flex", padding: '7px 15px', borderRadius: "20px", border: "1px solid rgb(128,128,128)" }}>
                  <div style={{ color: "skyblue" }} onClick={editPostModal.onOpen}><FaEdit /></div>
                  <div style={{ color: "red" }} onClick={handleClick}><FaTrash /></div>
                </div>
              ) : ""}
            </div>
            <div className=" mt-1">
              {data.body}
            </div>

            {data.image && (<img src={data.image} />)}
            <div className="flex flex-row items-center mt-3 gap-10">
              <div
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            ">
                <AiOutlineMessage size={20} />
                <p>
                  {data.comments?.length || 0}
                </p>
              </div>
              <div
                onClick={onLike}
                className="
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            ">
                <LikeIcon color={hasLiked ? 'red' : ''} size={20} />
                <p>
                  {data.likedIds.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default PostItem;
