import React, { useState } from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCartArrowDown, FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FiArrowDown } from "react-icons/fi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import UserMenu from "./UserMenu";
const Header = () => {
  const [isMobile] = useMobile();
  console.log("isMobile", isMobile);
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  const user = useSelector((state) => state?.user);
 

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const navigate = useNavigate();
  const reDirectLoginPage = () => {
    navigate("/login");
  };


  const handleCloseMenu=()=>{
    setOpenUserMenu(false)
  }

  

  const handleMobileUser=()=>{
    if(!user?._id){
      navigate("/login");
      return
    }
    navigate("/user");
  }

  return (
    <header className="h-28 lg:h-20 shadow-md sticky top-0 bg-white flex items-center flex-col justify-center gap-1 z-50">
  {!(isSearchPage && isMobile) && (
    <div className="container mx-auto flex items-center justify-between px-3">
      {/* Logo */}
      <div className="flex items-center h-full">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="w-[120px] h-[40px] lg:w-[170px] lg:h-[50px]"
            />
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="hidden lg:block">
        <Search />
      </div>

      {/* Login and Cart */}
      <div className="flex items-center">
        <button
          onClick={handleMobileUser}
          className="text-neutral-600 lg:hidden"
        >
          <span>
            <FaRegCircleUser size={25} />
          </span>
        </button>

        {/* Desktop part */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-6">
            {user?._id ? (
              <div className="relative">
                <div
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <p>Account</p>
                  {openUserMenu ? (
                    <TiArrowSortedUp size={20} />
                  ) : (
                    <TiArrowSortedDown size={20} />
                  )}
                </div>
                {openUserMenu && (
                  <div className="absolute -left-32 top-10 h-20 w-20">
                    <div className="bg-white rounded p-4 min-w-60 lg:shadow-lg border">
                      <UserMenu closeMenu={handleCloseMenu} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={reDirectLoginPage}
                className="text-lg px-2"
              >
                Login
              </button>
            )}

            <button className="flex items-center gap-2 bg-green-700 text-white px-4 py-3 rounded hover:bg-green-800 ease-in-out duration-300">
              <div className="animate-bounce">
                <FaCartArrowDown size={26} />
              </div>
              <div className="font-semibold">
                <p>My Cart</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Mobile Search */}
  <div className="lg:hidden container mx-auto px-2 md:w-2/3">
    <Search />
  </div>
</header>

  );
};

export default Header;
