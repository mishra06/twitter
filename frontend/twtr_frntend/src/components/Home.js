import React, { useEffect } from 'react'
import LeftSide from './LeftSide'
import RightSide from "./RightSide"
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useOtherUser from '../hooks/useOtherUser';
import useGetMyTweets from '../hooks/useGetMyTweets'

const Home = () => {
  const {user,otherUsers} = useSelector(store=>store.user);
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);

  useGetMyTweets(user?._id);
  useOtherUser(user?._id);

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftSide/>
      <Outlet/>
      <RightSide otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
