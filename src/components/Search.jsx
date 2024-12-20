import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { TiArrowBack } from "react-icons/ti";
const Search = () => {
  const navigate = useNavigate();
  const redirechToSearchPage = () => {
    navigate("/search");
  };
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
 
  const [isMobile] = useMobile();
 
  

  useEffect(() => {
    const isSearch = location?.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

   

  return (
    <div className="w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-600 bg-slate-50 group focus-within:border-primary-200 ">
      <div>
        {isSearchPage && isMobile ? (
          <>
            <Link to='/' className="flex items-center h-full p-2 group-focus-within:text-primary-200  bg-white rounded-full m-2 shadow-lg   ">
              <span>
              <TiArrowBack  size={20}/>
              </span>
            </Link>
          </>
        ) : (
          <>
            <button className="flex items-center h-full px-3 group-focus-within:text-primary-200 ">
              <span>
                <IoSearch size={20} />
              </span>
            </button>
          </>
        )}
      </div>
      <div className="w-full h-full flex items-center cursor-pointer  ">
        {!isSearchPage ? (
          <>
            <div onClick={redirechToSearchPage}>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Search "Milk"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Search "Bread"',
                  1000,
                  'Search "Sugar"',
                  1000,
                  'Search "Coffee"',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full  ">
              <input
                type="text"
                placeholder="Search your choice"
                autoFocus
                className="w-full h-full bg-transparent outline-none ml-2 "
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
