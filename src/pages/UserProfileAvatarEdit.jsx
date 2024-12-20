import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/User/UserSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close} ) => {
  const user = useSelector((state) => state.user);
  const dispatch= useDispatch()
  const [loading, setLoading]= useState(false)

  const handleSubmit=(e)=>{
        e.preventDefault()
  }

  const handleUploadAvatarImage=async(e)=>{
   const file = e.target.files[0]

   if(!file){
    return
   }

   const formData = new FormData()
   formData.append("avatar",file)

   try {
    setLoading(true)
    const res= await Axios({
        ...SummaryApi.uploadAvatar,
        data:formData
       })
       const {data:resData}= res
       console.log(resData.data.avatar);
       dispatch(updateAvatar(resData?.data?.avatar))
     
       
   } catch (error) {
    AxiosToastError(error)
   }finally{
    setLoading(false)
   }
 

  }

  return (
    <section className="fixed inset-0 top-0 bottom-0 right-0 left-0 bg bg-neutral-900 bg-opacity-40 p-4   flex justify-center items-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex justify-center items-center flex-col">
      
      <button onClick={close} className="block w-fit ml-auto mr-2"  ><IoClose size={25} /></button>
      
        <div className="w-20 h-20  flex items-center justify-center rounded-full ">
          {user.avatar ? (
            <>
              <img
                src={user.avatar}
                alt={user.name}
                className=" h-full w-full rounded-full object-cover overflow-hidden drop-shadow-sm "
              />
            </>
          ) : (
            <>
              <span>
                <FaUserCircle size={60} />
              </span>
            </>
          )}
        </div>
        <div>
          <form  onSubmit={handleSubmit}>
            <label htmlFor="uploadProfile" className="text-sm cursor-pointer">
              <div className="border border-green-500 px-4 mt-2 rounded py-1 text-sm">
                {
                    loading ?"Loading ...":"Upload"
                }
              </div>
              <input onChange={handleUploadAvatarImage} type="file" id="uploadProfile" className="hidden" />
            </label>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
