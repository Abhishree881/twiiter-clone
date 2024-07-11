import Image from "next/image";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getUser } from "@/actions/userActions";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  imgUrl?: string;
  noApi?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder,imgUrl,noApi }) => {
  // const { data: fetchedUser } = useUser(userId);
  const  [firstLoad, setFirstLoad] = useState(true);
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const handleAvatar = async() => {
    const data = await getUser(userId);
    if (firstLoad && data) {
      setFirstLoad(false);
      setFetchedUser(data);
    }
  }

  useEffect(()=>{
    if(firstLoad && !noApi){
      handleAvatar();
    }
  },[firstLoad])
  

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: 'cover',
          borderRadius: '100%',
          zIndex: '0'
        }}
        alt="Avatar"
        src={fetchedUser?.profileImage || imgUrl || '/images/placeholder.png'}
      />
    </div>
  );
}

export default Avatar;