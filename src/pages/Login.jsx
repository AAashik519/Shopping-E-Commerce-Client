 
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/User/UserSlice";
 

const Login = () => {
  const [data, setData] = useState({ 
    email: "",
    password: "",
 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const dispatch= useDispatch()
 
  const validateValue = Object.values(data).every((el) => el);
  const navigate= useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(data);
    
   

 try {
  const response = await Axios({
    ...SummaryApi.login,
    data:data
     
  })

  if(response?.data?.success){
    toast.success("Login Successfully")
    localStorage.setItem("accessToken", response.data.data.accessToken)
    localStorage.setItem("refreshToken", response.data.data.refreshToken)

    const userDetails= await fetchUserDetails()
    dispatch(setUserDetails(userDetails?.data))


    setData({
      email:"",
      password:"",
  
    })
    navigate('/')
    // window.location.reload();
  }

  console.log("response",response);
 } catch (error) {
  console.log(error);
  
  AxiosToastError(error)
  
 }
    

 

  };

  return (
    <section className=" w-full container mx-auto px-5 min-h-screen flex flex-col  ">
      <div className="flex-grow flex items-center justify-center">
      <div
        className="bg-white my-4 w-full max-w-md mx-auto rounded-xl p-6  "
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-secondary-200">
            Welcome to Binkeyit
          </p>
          <p className="mt-1 text-gray-500">Login Your Account </p>
        </div>

        <div>
          <form action="" className="grid gap-3 mt-5 " onSubmit={handleSubmit}>
       
            <div className="grid gap-1">
              <label htmlFor="email">Email</label>
              <input
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                }}
                name="email"
                id="email"
                type="email"
                placeholder="Enter your Email "
          
                className=" placeholder:text-[14px]  p-2 rounded   outline-none border focus-within:border-secondary-200"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="password">Password</label>
              <div className="grid relative">
                <input
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  }}
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password "
                  
                  className="   p-2 rounded   outline-none border focus-within:border-secondary-200 placeholder:text-[14px]"
                  value={data.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute cursor-pointer right-4 top-4"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <span>
                      <LuEye />
                    </span>
                  ) : (
                    <span>
                      <LuEyeOff />
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mr-2">
              <Link to='/forgot-password' className="text-sm text-blue-500 hover:text-blue-700 duration-300 ">forgot password</Link>
            </div>
            
            <div className="grid w-1/2 mx-auto mt-2">
              <button
                disabled={!validateValue}
                type="submit"
                className={` ${
                  validateValue
                    ? "bg-green-700 hover:bg-green-800 duration-300"
                    : "bg-gray-700"
                }  text-white py-2 px-8 rounded font-semibolde tracking-wide`}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center mt-4 text-sm text-gray-600">
            <p>Doesn't have any  account ? <Link to='/register' > <span className="text-blue-500 font-semibold hover:text-blue-600 duration-300" >Register</span></Link></p>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
};

export default Login;
