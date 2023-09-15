import useUsers from '@/hooks/useUsers';

import Avatar from '../Avatar';

const FollowBar: React.FC<{ mode: number }> = ({ mode }) => {
  const { data: users = [] } = useUsers();

  if (users.length === 0) {
    return null;
  }

  return (
    < div className='followbar' >
      <div className={`follow-box ${mode ? "follow-box-light" : "follow-box-dark"}`}>
        <span className="follow-head">Who to follow</span>
        <div className="flex flex-col gap-6 mt-4 ">
          {users.map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4 hover:bg-gray-600" style={{ borderRadius: "50px" }}>
              <Avatar userId={user.id} />
              <div className="flex flex-col ">
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

export default FollowBar;
