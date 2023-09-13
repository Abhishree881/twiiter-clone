import React from 'react'
import "../../styles/sidebar.css"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { FaFeather } from 'react-icons/fa'

type Props = {}

const Sidebar = (props: Props) => {

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: <HomeRoundedIcon style={{ fontSize: "30px" }} />
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: <NotificationsActiveIcon style={{ fontSize: "30px" }} />
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: <Person2RoundedIcon style={{ fontSize: "30px" }} />
        },
    ]
    return (
        <div className='sidebar-body'>
            <a href="/">
                <img className='logo' src="./logo.webp"></img>
            </a>
            <div className="sidenav">
                {items.map((index) => {
                    return (
                        <div className='sidenav-items' key={index.href}>
                            <a href={index.href}>
                                <span className='sidenav-icon'>{index.icon}</span>
                                <span className='sidenav-text'>{index.label}</span>
                                <span className='sidenav-desc'>{index.label}</span>
                            </a>
                        </div>
                    )
                })}
                <div className="sidenav-items">
                    <a href="">
                        <span className="sidenav-icon"><LogoutIcon /> </span>
                        <span className="sidenav-text">Logout</span>
                        <span className="sidenav-desc">Logout</span>
                    </a>
                </div>
            </div>
            <a className='post-a' href="/">
                <div className="post-button">

                    <span className="post-icon"><FaFeather /></span>
                    <span className="post-text">Post</span>

                </div>
            </a>
        </div>
    )
}

export default Sidebar