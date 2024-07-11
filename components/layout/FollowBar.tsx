import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
// import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';
import { getUsers } from "@/actions/userActions";
import { connect } from "react-redux";

const FollowBar: React.FC<{ mode: number, users: any [], getUsers: () => void }> = ({ mode, users,getUsers }) => {
  const router = useRouter();
  const  [firstLoad, setFirstLoad] = useState(true);
  // const { data: users = [] } = useUsers();

  useEffect(()=>{
    if(firstLoad){
      getUsers();
      setFirstLoad(false);
    }
  })

  const onClick = (userId: string) => {
    const url = `/users/${userId}`;
    router.push(url);
  }



  if (users.length === 0) {
    return null;
  }
  

  return (
    < div className='followbar' >
      <div className={`follow-box ${mode ? "follow-box-light" : "follow-box-dark"}`}>
        <span className="follow-head">Who to follow</span>
        <div className="flex flex-col gap-2 mt-4 ">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} onClick={()=>onClick(user.id)} className={`flex flex-row gap-4 ${mode ? 'hover:bg-neutral-300' : 'hover:bg-gray-900'}`} style={{ borderRadius: "12px", padding: "10px", cursor:"pointer" }}>
              <Avatar userId={user.id} imgUrl={user.profileImage} noApi={true}/>
              <div className="flex flex-col">
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-500 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.user.users,
});

const mapDispatchToProps = {
  getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowBar);
