 


 
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
 

const ForgotPassword = () => {
  const [data, setData] = useState({ 
    email: "",
     
 
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

 
 
  const validateValue = Object.values(data).every((el) => el);
  const navigate= useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(data);
    
   

 try {
  const response = await Axios({
    ...SummaryApi.forgot_password,
    data:data
     
  })

  if(response?.data?.success){
    toast.success(response?.data?.message)

    navigate('/otp-verification' ,{
      state: data
    })
    setData({
      email:"",
    })
 
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
          <p className="mt-1 text-gray-500">Forgot Password </p>
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
            

            
            
            <div className="grid w-1/2 mx-auto mt-2">
              <button
                disabled={!validateValue}
                type="submit"
                className={` ${
                  validateValue
                    ? "bg-green-700 hover:bg-green-800 duration-300"
                    : "bg-gray-700"
                }  text-white py-2 px-8 rounded font-semibolde uppercase tracking-wide`}
              >
                Send Otp
              </button>
            </div>
          </form>
        
        </div>
      </div>

      </div>
    </section>
  );
};

export default ForgotPassword;
