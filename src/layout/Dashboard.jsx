import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3   ">
        <div className="grid lg:grid-cols-[320px,1fr] my-6 gap-5" >
          {/* left */}
          <div className="sticky  top-28 overflow-y-auto max-h-screen hidden lg:block">
            <UserMenu />
          </div>

          {/* right */}
          <div className="  ">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
