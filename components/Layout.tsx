import React from 'react';

import FollowBar from "@/components/layout/FollowBar"
import Sidebar from "@/components/layout/Sidebar"

const Layout: React.FC<{ children: React.ReactNode, mode: number, setMode: (newMode: number) => void; }> = ({ children, mode, setMode }) => {
  return (
    <body className={`body ${mode ? 'body-light' : 'body-dark'}`}>
      <main>
        <div className={`sidebar ${mode ? 'sidebar-light' : 'sidebar-dark'}`}>
          <Sidebar mode={mode} setMode={setMode} />
        </div>
        <div className={`main ${mode ? 'main-light' : 'main-dark'}`}>
          {children}
        </div>
        <div className={`follow ${mode ? 'follow-light' : 'follow-dark'}`}>
          <FollowBar mode={mode} />
        </div>
      </main>
    </body>
  )
}

export default Layout;
