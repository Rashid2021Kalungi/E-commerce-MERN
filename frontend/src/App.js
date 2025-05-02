
import './App.css';
import {Outlet} from 'react-router-dom'
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import summeryApi from './common';
import Context from './context';


function App() {
  const fetchUserDetails=async()=>{
    const dataResponse = await fetch(summeryApi.currentUser.url,{
      method: summeryApi.currentUser.method,
      credentials: "include"
    })
    const dataApi= await dataResponse.json()
    console.log("user data",dataApi)
  }
  useEffect(()=>{
    // userDetails
    fetchUserDetails()
  })
  return (
    <>
    <Context.Provider value={{
      fetchUserDetails
    }}>

    <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
