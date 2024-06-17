import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";

const RightSide = () => {
  return (
    <div className='w-[25%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
      <CiSearch size="25px" />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
    </div>
  )
}

export default RightSide
