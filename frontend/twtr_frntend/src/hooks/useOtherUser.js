import axios from "axios";
import { User_End_point } from "../utils/Constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/slices/UserSlice";
const useOtherUsers = async(id)=>{

    const dispatch = useDispatch();

    const fetchOtherUsers = async()=>{
        try {
            const result = await axios.get(`${User_End_point}/otheruser/${id}`,{
                withCredentials: true
            });
            console.log(result);
            dispatch(getOtherUsers(result.data.otherUsers));
        } catch (error) {
            console.log(error);
        }
    }
    // fetchMyProfile();
    useEffect(()=>{
        fetchOtherUsers();
        // return (()=>{
        //     dispatch(getOtherUsers(null));
        // })
    },[id])
    
}

export default useOtherUsers;
