import React from 'react'
import { FaFacebook ,FaInstagram, FaLinkedin} from "react-icons/fa";
import { Link } from 'react-router-dom';
 
const Footer = () => {
  return (
     <footer className='border-t bg-white '>
        <div className='container mx-auto p-4 text-center flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center'>
            <p>© All Rights Reserved 2024 by Al-Amin Ashik</p>
 
                <ul className='flex items-center  gap-4 justify-center '>
                    <li className='text-blue-600 text-xl hover:text-blue-700 duration-300'>
                        <Link> <FaFacebook   /></Link>
                    </li>
                    <li className='text-red-500  text-xl hover:text-red-700 duration-300' >
                        <Link> <FaInstagram /></Link>
                    </li>
                    <li className='text-blue-600 text-xl hover:text-blue-700 duration-300'>
                        <Link><FaLinkedin /></Link>
                    </li>
                </ul>
          
        </div>
     </footer>
  )
}

export default Footer
