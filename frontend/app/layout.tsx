import './globals.css'
import type { Metadata } from 'next'
import Sidebar from './components/Sidebar'

export const metadata: Metadata = {
  title: 'Twitter',
  description: 'A twitter clone made for Yellow Class  ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="main">
            {children}
          </div>
          <div className="follow">

          </div>
        </main>
      </body>
    </html>
  )
}
