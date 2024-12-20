import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/User/UserSlice";

function App() {
  const dispatch = useDispatch()
  const fetChUser =async()=>{
    const userData = await fetchUserDetails()

    dispatch(setUserDetails(userData?.data))
    
  }

  useEffect(()=>{
    fetChUser()
  },[])

  return (
    <>
     <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </div>
    </>
  );
}

export default App;
