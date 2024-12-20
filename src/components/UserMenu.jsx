import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logoutState } from "../store/User/UserSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaRegEdit } from "react-icons/fa";
 
const UserMenu = ({closeMenu}) => {
  const user = useSelector((state) => state.user);
  const navigate= useNavigate()
  console.log(user);
  const dispatch= useDispatch()

  const handleLogOut=async()=>{
        try {
            const res = await Axios({
                ...SummaryApi.logout
            })
            if(res.data.success){
              if(closeMenu){
                closeMenu()
              }
           
                dispatch(logoutState() )
                localStorage.clear()
                toast.success(res?.data?.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
  }

  const handleClose =()=>{
      if(closeMenul){
        closeMenu()
      }
  }

  
  return (
    <div>
      <div>
        <h1 className="font-semibold text-center">My Account</h1>
        <hr className="mt-1 bg-green-500 h-[1.5px]" />
        <div className="mt-1 flex flex-col items-start gap-2">
          <p className="text-neutral-700 text-sm flex items-center gap-3">{user?.name} <Link onClick={handleClose}  to='/dashboard/profile'> <span className="hover:text-blue-500 duration-300"><FaRegEdit size={16} /></span></Link></p>
          <p className="text-neutral-700 text-sm ">{user?.email}</p>
          
         
 
            <Link onClick={handleClose} to='/dashboard/myorders' className="text-neutral-700 text-sm underline hover:text-blue-500 duration-300">My Order</Link>
            <Link onClick={handleClose} to='/dashboard/address' className="text-neutral-700 text-sm underline  hover:text-blue-500 duration-300">Save Address </Link>
            <button onClick={handleLogOut} className="bg-secondary-200 px-8 text-sm py-1 rounded w-full mt-2 text-white" >Logout</button>
             
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
