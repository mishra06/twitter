import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User_End_point } from '../utils/Constant';
import axios from 'axios';
import { getMyProfile, getOtherUsers, getUser } from '../redux/slices/UserSlice';
import toast from 'react-hot-toast';

const LeftSide = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(store=>store.user);

    const logoutHndler = async ()=>{
        try {
            // axios.defaults.withCredentials = true;
            const res = await axios.get(`${User_End_point}/logout`);
        dispatch(getUser(null));
        dispatch(getOtherUsers(null));
        dispatch(getMyProfile(null));
        navigate('/login');
        toast.success(res.data.message);
        } catch (error) {
            // toast.success(error.response.data.message);
            console.log(error);
        }
        
    }


  return (
    <div className='w-[20%]'>
        <div>
            <div>
                <img className='ml-5' width={"25px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="logos" />
            </div>
            <div className='my-4'>
                <Link to={"/"} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <IoHomeOutline size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <CiHashtag size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <IoIosNotificationsOutline size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Notifications</h1>
                </div>
                <Link to={`/profile/${user?._id}`}  className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <CiUser size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>
                <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <CiBookmark size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                </div>
                <div onClick={logoutHndler} className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                        <AiOutlineLogout size="24px"/>
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Logout</h1>
                </div>
                <button className='px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold'>Post</button>
            </div>
        </div>
    </div>
  )
}

export default LeftSide
