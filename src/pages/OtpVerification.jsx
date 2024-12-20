import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const OtpVerification = () => {

  const location = useLocation()
  const navigate=useNavigate()
  console.log(location);

  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot-password/")
    }
  },[])
  

  const [otp, setOtp] = useState(new Array(6).fill(""));

    const handleChange = (element, index) => {
      if (isNaN(element.value)) return;

      setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

      // Focus next input field
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    };

  const validateValue = otp.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(otp.join(""));

    try {
      const response = await Axios({
        ...SummaryApi.verify_forgot_password_otp,
         data:{
          email:location?.state?.email,
          otp:otp.join("")
         }
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      
        navigate("/reset-password",{
          state:{
            data:response.data,
            email:location?.state.email
          }
        });
      }

      console.log("response", response);
    } catch (error) {
       console.log(error);

      AxiosToastError(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          OTP Verification
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Enter the 6-digit code sent to your email or phone.
        </p>
        <div className="flex justify-center gap-2 mt-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-12 h-12 text-center text-lg font-medium border rounded-md focus:ring focus:ring-blue-500 focus:outline-none bg-gray-50"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Verify OTP
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn't receive the code?{" "}
          <button className="text-blue-500 font-medium hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
