import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

const Tweet = () => {
  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex p-4'>
                <Avatar src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>Mishra</h1>
                        <p className='text-gray-500 text-sm ml-1'>@mishra7262 .2m</p>
                    </div>
                    <div>
                        <p>Lets go deev deep into web developement</p>
                    </div>
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size="25px" />
                            </div>
                            <p className='ml-1'>1</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-red-600 rounded-full cursor-pointer'>
                                <CiHeart size="25px" />
                            </div>
                            <p className='ml-1'>1</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-400 rounded-full cursor-pointer'>
                                <CiBookmark size="25px" />
                            </div>
                            <p className='ml-1'>1</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet
