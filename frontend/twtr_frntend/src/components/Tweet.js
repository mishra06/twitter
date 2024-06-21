import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from 'axios';
import { Twitt_Api } from '../utils/Constant';
import { useSelector,useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/slices/TwitterSlice';
import { timeSince } from '../utils/Constant';

const Tweet = ({tweet}) => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.user);

    const likeHandeler = async (id)=>{
        try {
            const res = await axios.put(`${Twitt_Api}/like/${id}`,{id:user?._id},{
                withCredentials: true,
            })
            dispatch(getRefresh());
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.success(error.result.data.message);
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id)=>{
        try {
            axios.defaults.withCredentials=true;
            const res = await axios.delete(`${Twitt_Api}/delete/${id}`);
            if(res.data.success){
                toast.success(res?.data?.message);
                dispatch(getRefresh());
            }
        } catch (error) {
            toast.success(error.res?.data?.message);
        }
    }

  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex p-4'>
                <Avatar src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" size="40" round={true} />
                <div className='ml-2 w-full'>
                    <div className='flex items-center'>
                        <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                        <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}. ${timeSince(tweet?.createdAt)}`}</p>
                    </div>
                    <div>
                        <p>{tweet?.description}</p>
                    </div>
                    <div className='flex justify-between my-3'>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                                <FaRegComment size="25px" />
                            </div>
                            <p className='ml-1'>1</p>
                        </div>
                        <div className='flex items-center'>
                            <div onClick={()=>likeHandeler(tweet?._id)
                            } className='p-2 hover:bg-red-600 rounded-full cursor-pointer'>
                                <CiHeart size="25px" />
                            </div>
                            <p className='ml-1'>{tweet?.like?.length}</p>
                        </div>
                        <div className='flex items-center'>
                            <div className='p-2 hover:bg-green-400 rounded-full cursor-pointer'>
                                <CiBookmark size="25px" />
                            </div>
                            <p className='ml-1'>{tweet?.userDetails[0]?.bookmarks.length}</p>
                        </div>

                        {
                            user?._id === tweet?.userId && ( 
                                <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                    <div className='p-2 hover:bg-red-400 rounded-full cursor-pointer'>
                                        <MdOutlineDeleteOutline size="25px" />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet
