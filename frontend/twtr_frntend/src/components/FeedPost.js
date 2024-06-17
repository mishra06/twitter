import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";

const FeedPost = () => {
  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg ">For you</h1>
          </div>
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3">
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div >
            <div className='flex items-center p-4'>
                <div>
                  <Avatar src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" size="40" round={true} />
                </div>
                  <input className='w-full outline-none border-none text-xl ml-2' type="text" placeholder="What is happening?!" />
            </div>
            <div className='flex items-center justify-between p-4 border-b border-gray-300'>
              <div className="flex">
                  <CiImageOn size="24px" />
                  <CiImageOn size="24px" />
              </div>
              <button className='bg-[#1D9BF0] px-4 py-1 text-lg text-white text-right border-none rounded-full'>post</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
