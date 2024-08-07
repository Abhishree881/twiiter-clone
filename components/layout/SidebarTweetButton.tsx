import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useRouter } from "next/router";
import useCreatePostModal from "@/hooks/useCreatePostModal";
import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const createModal = useCreatePostModal();
  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    createModal.onOpen();
    // router.push('/');
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick} className="post-a">
      <div className="post-button">

        <span className="post-icon"><FaFeather /></span>
        <span className="post-text">Post</span>

      </div>
    </div>
  );
};

export default SidebarTweetButton;
