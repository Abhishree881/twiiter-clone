"use client"
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    document.title = 'Home / Twitter';
  }, []);
  return (
    <div >
      Twitter Clone
    </div>
  )
}
