 

 
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";
 

const ResetPassword = () => {
  const location = useLocation()
  console.log(location);
  
  const [data, setData] = useState({
    email: location?.state?.email,
    newPassword: "",
    confirmPassword: "",
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

  const [showNewPassword , setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const validateValue = Object.values(data).every((el) => el);
  const navigate= useNavigate()

  useEffect(()=>{
    if(!location?.state?.data?.success){
     navigate('/') 
    }
  },[])

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(data);
    
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Password and confirm password must be same");
      return
    }

 try {
  const response = await Axios({
    ...SummaryApi.reset_password,
    data:data
     
  })

  if(response?.data?.success){
    toast.success(response.data?.message)
    setData({
      email: "",
      newPassword: "",
      confirmPassword: "",
    })
    navigate('/')
  }

  console.log("response",response);
 } catch (error) {
   AxiosToastError(error)
  
 }
    

 

  };

  return (
    <section className=" w-full container mx-auto px-5">
      <div
        className="bg-white my-4 w-full max-w-md mx-auto rounded-xl p-6 "
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        <div className="text-center">
          <p className="text-2xl font-semibold text-secondary-200">
            Welcome to Binkeyit
          </p>
          <p className="mt-1 text-gray-500">Create Your Account </p>
        </div>

        <div>
          <form action="" className="grid gap-3 mt-5 " onSubmit={handleSubmit}>
         
            <div className="grid gap-2">
              <label htmlFor="newPassword">New Password</label>
              <div className="grid relative">
                <input
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  }}
                  name="newPassword"
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Confirm Your Password "
                  
                  className="   p-2 rounded   outline-none border focus-within:border-secondary-200 placeholder:text-[14px]"
                  value={data.showNewPassword}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-4 cursor-pointer top-4"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                >
                  {showNewPassword ? (
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

            <div className="grid gap-1">
              <label htmlFor="confirmPassword">confirmPassword</label>
              <div className="grid relative">
                <input
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                  }}
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your Password "
                  
                  className="   p-2 rounded   outline-none border focus-within:border-secondary-200 placeholder:text-[14px]"
                  value={data.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute cursor-pointer right-4 top-4"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
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
                Change Password
              </button>
            </div>
          </form>
         
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;

