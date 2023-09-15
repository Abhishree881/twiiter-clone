import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import useUser from "@/hooks/useUser";

import PostFeed from "@/components/posts/PostFeed";
import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";



const UserView: React.FC<{ mode: number }> = ({ mode }) => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

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
      <PostFeed mode={mode} userId={userId as string} profile={true} />
    </>
  );
}

export default UserView;