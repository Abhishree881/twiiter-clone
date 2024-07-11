import { useRouter } from 'next/router';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { formatDistanceToNowStrict } from 'date-fns';

import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';

import Avatar from '../Avatar';
import useEditPostModal from "@/hooks/useEditPostModal";

import axios from "axios";
import { toast } from "react-hot-toast";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { likePost } from '@/actions/likeActions';
import { connect } from 'react-redux';
import { getPost } from '@/actions/postActions';

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
  profile?: boolean;
  mode: number;
  likePost: (postId: string, hasLiked: boolean, userId: string) => void;
  getPost: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId, profile, mode, likePost, getPost }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const editPostModal = useEditPostModal();
  const { data: currentUser } = useCurrentUser();
  const [hasLiked, setHasLiked] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);

  useEffect(() => {
    if (currentUser && data.likedIds.includes(currentUser.id)) {
      setHasLiked(true);
    } else {
      setHasLiked(false);
    }
  }, [currentUser, data.likedIds]);

  const goToUser = (ev: any) => {
    ev.stopPropagation();
    router.push(`/users/${data.user.id}`);
  };

  const goToPost = () => {
    router.push(`/posts/${data.id}`);
  };

  const onLike = (ev: any) => {
    ev.stopPropagation();
    if (!currentUser) {
      return loginModal.onOpen();
    }
    likePost(data.id, hasLiked, currentUser.id);
  };

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const [isLoading, setIsLoading] = useState(false);

  const id = data.id;

  const handleDeleteClick = useCallback(async (ev: any) => {
    ev.stopPropagation();
    try {
      setIsLoading(true);

      await axios.delete('/api/delete', { data: { id } });

      toast.success('Deleted');
      // setFetch(true);  // Trigger a re-fetch in the parent component
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const handleEditClick = (ev: any) => {
    ev.stopPropagation();
    editPostModal.onOpen();
    getPost(data.id);
  };

  const handleMenuClick = (ev: any) => {
    ev.stopPropagation();
    setSubmenuVisible(!submenuVisible);
  };

  return (
    <>
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
          <Avatar userId={data.user.id} noApi={true} imgUrl={data.user.profileImage} />
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
              </div>
              {profile && currentUser?.id === userId ? (
                <div style={{ position: "relative" }}>
                  <div
                    style={{ color: submenuVisible ? "blue" : "inherit" }}
                    onClick={handleMenuClick}
                    className="cursor-pointer"
                  >
                    <BsThreeDots size={20} className="hover:text-blue-500" />
                  </div>
                  {submenuVisible && (
                    <div
                      className={`
                      absolute 
                      right-0 
                      w-22 
                      rounded-md 
                      shadow-lg 
                      z-20
                      ${mode ? 'bg-white' : 'bg-gray-800'}
                      `}
                      style={{
                        border: `1px solid ${mode ? 'rgb(128,128,128)' : 'gray'}`,
                        top: "80%",
                        right: 0,
                      }}
                    >
                      <div className="flex flex-col p-2">
                        <div
                          className="flex items-center gap-2 p-2 rounded-md cursor-pointer text-xs hover:bg-blue-500 hover:text-white"
                          onClick={(ev) => handleEditClick(ev)}
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </div>
                        <div
                          className="flex items-center gap-2 p-2 rounded-md cursor-pointer text-xs hover:bg-red-500 hover:text-white"
                          onClick={handleDeleteClick}
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : ""}
            </div>
            <div className="mt-1">
              {data.body}
            </div>
            {data.image && (<img className='mt-2 rounded-lg' style={{maxHeight:"350px"}} src={data.image} alt="Post image" />)}
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
  );
};

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  likePost,
  getPost
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
