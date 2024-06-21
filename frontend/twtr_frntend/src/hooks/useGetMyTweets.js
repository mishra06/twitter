import axios from "axios";
import { Twitt_Api } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTweets } from "../redux/slices/TwitterSlice";
const useGetMyTweets = (id)=>{

    const dispatch = useDispatch();
    const {refresh,isActive} = useSelector(store=>store.tweet);

    const fetchMyTweets = async()=>{
        try {
            const result = await axios.get(`${Twitt_Api}/alltweets/${id}`,{
                withCredentials: true
            });
            console.log(result,"usegetprofile");
            dispatch(getAllTweets(result.data.tweets));
        } catch (error) {
            console.log(error);
        }
    }

    const followingsTweetHndlr = async ()=>{
        // const id = user?._id;
          try {
            axios.defaults.withCredentials = true;
            const res = await axios.get(`${Twitt_Api}/followingtweets/${id}`);
            console.log(res);
            dispatch(getAllTweets(res?.data?.tweets));
          } catch (error) {
            console.log(error);
          }
      }
    // fetchMyProfile();
    useEffect(()=>{
        if(isActive){
            fetchMyTweets();
        }else{
            followingsTweetHndlr();
        }
    },[refresh,isActive]);
    
}

export default useGetMyTweets;