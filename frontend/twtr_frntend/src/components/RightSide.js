import React from 'react'
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";

const RightSide = () => {
  return (
    <div className='w-[25%] '>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
      <CiSearch size="25px" />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who to follow</h1>
        <div className='flex items-center justify-between my-3'>
          <div className='flex'>
            <div>
              <Avatar src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" size="40" round={true} />
            </div>
            <div className='ml-2'>
              <h1 className='font-bold'>Mishra</h1>
              <p className='text-sm'>@Mishra</p>
            </div>
          </div>
          <div>
          <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSide
