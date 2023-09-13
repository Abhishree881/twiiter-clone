"use client"
import { useEffect } from 'react'
import '../styles/home.css'

export default function Home() {
  useEffect(() => {
    document.title = 'Home / Twitter';
  }, []);
  return (
    <div className='home'>
      <div className="home-header">
        <div className="home-head">Home</div>
        <div className="home-icon"><img className='home-logo' src='./logo.webp' /></div>
      </div>
    </div>
  )
}
