import React from 'react'
import '../../styles/followbar.css'

type Props = {}

const Followbar = (props: Props) => {
    return (
        <div className='followbar'>
            <div className="follow-box">
                <span className="follow-head">Who to follow</span>
                <div className="follow-users">Userlist</div>
            </div>
        </div>
    )
}

export default Followbar;