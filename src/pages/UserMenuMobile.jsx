import React from "react";
import UserMenu from "../components/UserMenu";
import { IoIosCloseCircleOutline } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <section className="bg-white">
      <div onClick={()=> window.history.back()} className="text-neutral-600  flex justify-end mr-5">
        <span>
          <IoIosCloseCircleOutline size={32} />
        </span>
      </div>
      <div className="container mx-auto p-6 h-full ">
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
