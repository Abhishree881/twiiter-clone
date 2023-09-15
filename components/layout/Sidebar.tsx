import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { IoMdSwitch } from 'react-icons/io';
import useCurrentUser from '@/hooks/useCurrentUser';
import Link from 'next/link';

import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar: React.FC<{ mode: number, setMode: (newMode: number) => void; }> = ({ mode, setMode }) => {
  const { data: currentUser } = useCurrentUser();

  const ModeSwitch = () => {
    if (mode == 1)
      setMode(0);
    else
      setMode(1);

    console.log(mode)
  }

  const items = [
    {
      icon: BsHouseFill,
      label: 'Home',
      href: '/',
    },
    {
      icon: BsBellFill,
      label: 'Notifications',
      href: '/notifications',
      auth: true,
      alert: currentUser?.hasNotification
    },
    {
      icon: FaUser,
      label: 'Profile',
      href: `/users/${currentUser?.id}`,
      auth: true,
    },
  ]

  return (
    <div className={`sidebar-body ${mode ? "sidebar-body-light" : "sidebar-body-dark"}`}>
      <Link href="/"  >
        {mode ? <img className='logo' style={{ marginLeft: "12px" }} src='https://clipart.info/images/ccovers/1534043161Twitter-Bird-Png.png' /> :
          <img className='logo' src="https://i.ytimg.com/vi/bZqPmiikY-s/maxresdefault.jpg" />}
      </Link>
      <div className="sidenav">
        {items.map((item) => (
          <SidebarItem
            key={item.href}
            alert={item.alert}
            auth={item.auth}
            href={item.href}
            icon={item.icon}
            label={item.label}
            mode={mode}
          />
        ))}
        <SidebarItem icon={IoMdSwitch} mode={mode} label="Theme" onClick={ModeSwitch} />
        {currentUser && <SidebarItem onClick={() => signOut()} icon={BiLogOut} mode={mode} label="Logout" />}
      </div>
      <SidebarTweetButton />
    </div>
  )
};

export default Sidebar;
