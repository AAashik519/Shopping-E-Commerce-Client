import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import UserProfileAvatarEdit from './UserProfileAvatarEdit';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileEdit, setOpenProfileEdit]= useState(false)
  console.log(user);

  const [userData, setUserData] = useState({
    name: '',
    mobile: '',
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        mobile: user.mobile || '',
      });
    }
  }, [user]);
  console.log(user.name);
  console.log(user.mobile);

  const handleOnchange=(e)=>{
      const {name,value}= e.target
      setUserData((prev)=>{
        return {
          ...prev,
          [name]:value
        }
      })


  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const toastId= toast.loading("Submitting Data")
    try {
      const res = await Axios({
        ...SummaryApi.updateUserprofile,
        data:userData
      })
      console.log(res);
      
      if(res.data.success){
        toast.success("Updated Profile",{id:toastId} )
      }
    } catch (error) {
      toast.error(error?.res?.data?.message,{id:toastId} )
    }
  }
  
  
  return (
    <div className='ml-4 mt-2'>
      <div className='w-20 h-20  flex items-center justify-center rounded-full ml-8'>
        {
          user.avatar? <>
            <img src={user.avatar} alt={user.name} className=' h-full w-full rounded-full object-cover overflow-hidden drop-shadow-sm ' />
          </> :<>
            <span><FaUserCircle size={60} /></span>
          </>
        }
      
      </div>
      <button onClick={( )=> setOpenProfileEdit(prev =>!prev)} className='min-w-20 px-3 py-1 rounded-full mt-2 text-neutral-700 border border-green-500 hover:border-green-700 duration-300' ><span className='text-sm ' >Change Avatar</span></button>

        {
          openProfileEdit &&(
            <UserProfileAvatarEdit  close={()=>setOpenProfileEdit(prev => !prev)}  />
          )
        }


        {/* change profile details  */}

          <div>
            <form onSubmit={handleSubmit} action="" className='mt-4'>
              <div className='grid '>
                <label htmlFor="">Name</label>
                <input type="text" 
                placeholder='Enter your name'
                name='name'
                className='p-2 bg-slate-50 rounded outline-none border focus:outline-secondary-200 outline-1'
                value={userData.name}
                onChange={handleOnchange}
                required
                 
                />
              </div>
              <div className='grid '>
                <label htmlFor="">Phone</label>
                <input type="text" 
                name='mobile'
                placeholder='Enter your Phone'
                className='p-2 bg-slate-50 rounded outline-none border focus:outline-secondary-200 outline-1'
                value={userData.mobile}
                onChange={handleOnchange}
                required
                 
                />
              </div>

              <div className='flex justify-center items-center mt-5 '>
                <button type='submit' className='bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 duration-300 w-1/3 '>Save Profile</button>
              </div>

            </form>
          </div>
     
    </div>
  )
}

export default Profile
