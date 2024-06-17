import React from 'react'
import LeftSide from './LeftSide'
import RightSide from "./RightSide"
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSide/>
      <Outlet/>
      <RightSide/>
    </div>
  )
}

export default Home
