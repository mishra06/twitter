import React from 'react'
import LeftSide from './LeftSide'
import Feed from './Feed'
import RightSide from "./RightSide"

const Home = () => {
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSide/>
      <Feed/>
      <RightSide/>
    </div>
  )
}

export default Home
