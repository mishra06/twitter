import React, { useState } from "react";
import axios from "axios";
import { User_End_point } from "../utils/Constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/slices/UserSlice";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandeler = () => {
    setLogin(!login);
  };

  // form submit handeler function
  const submitHandeler = async (e) => {
    e.preventDefault();
    if (login) {
      try {
        const res = await axios.post(
          `${User_End_point}/login`,
          { email, password },
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        console.log(res,"ress");
        dispatch(getUser(res?.data?.user));
        if(res?.data?.success){
          navigate("/");
          toast.success(res.data.message);
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${User_End_point}/register`,
          { name, email, username, password },
          {
            headers: {
              "Content-Type": "application/json"
            },
            withCredentials: true
          }
        );
        if(res.data.success){
          setLogin(true);
          toast.success(res.data.message);
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-5"
            width={"300px"}
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-3xl font-bold">
            {login ? "Sign in to X" : "Join today."}
          </h1>
          <form onSubmit={submitHandeler} className="flex flex-col w-[55%]">
            {!login && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Username"
                  className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className="bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white">
              {login ? "Login" : "Singup"}
            </button>
            <h1>
              {" "}
              {login ? "Do not have an account?" : "Already have an account?"}
              <span
                className="font-bold text-blue-600 cursor-pointer"
                onClick={loginHandeler}
              >
                {login ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
