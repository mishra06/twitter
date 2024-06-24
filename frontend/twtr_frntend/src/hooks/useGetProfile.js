import axios from "axios";
import { User_End_point } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/slices/UserSlice";
const useGetProfile = async(id)=>{

    console.log("id",id);
    const dispatch = useDispatch();

    const fetchMyProfile = async()=>{
        try {
            const result = await axios.get(`${User_End_point}/profile/${id}`,{
                withCredentials: true
            });
            console.log(result.data.user,"usegetprofileeeee");
            dispatch(getMyProfile(result.data?.user));
        } catch (error) {
            console.log(error);
        }

    }
    // fetchMyProfile();
    useEffect(()=>{
        fetchMyProfile();
    },[id])
    
}

export default useGetProfile;