import React, { useState } from 'react'

const Login = () => {

  const [login , setLogin] = useState(true);
  

  const loginHandeler =()=>{
        setLogin(!login);
  }
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
    <div className='flex items-center justify-evenly w-[80%]'>
      <div>
        <img className='ml-5' width={"300px"} src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" />
      </div>
      <div>
        <div className='my-5'>
          <h1 className='font-bold text-6xl'>Happening now.</h1>
        </div>
        <h1 className='mt-4 mb-2 text-3xl font-bold'>{login ? "Sign in to X" : "Join today."}</h1>
        <form className='flex flex-col w-[55%]'>
          {
            !login && ( <>
                  <input type="text" placeholder='Name' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
                  <input type="text" placeholder='Username' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
            </>)
          }
              
          <input type="email" placeholder='Email' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
          <input type="password" placeholder='Password' className="outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold" />
          <button className='bg-[#1D9BF0] border-none py-2 my-4 rounded-full text-lg text-white' >{login ? "Login" : "Singup"}</button>
          <h1> {login ? "Do not have an account?" : "Already have an account?"}<span className='font-bold text-blue-600 cursor-pointer' onClick={loginHandeler}>{login ? "Signup" : "Login"}</span></h1>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Login
