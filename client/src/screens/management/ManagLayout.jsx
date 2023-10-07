import React, { useState, useEffect } from 'react';
import './ManagLayout.css'
import { detacontext } from '../../App'
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './manag.component/navbar/NavBar';
import SideBar from './manag.component/sidebar/SideBar';
import jwt_decode from "jwt-decode";



const ManagLayout = () => {

  const token = localStorage.getItem('token')
  if (token) {
    const decodetoken = jwt_decode(token)
    const isadmin = decodetoken.userinfo.isAdmin
    if (isadmin) {
      return (
        <div className='manag-screen'>
          <SideBar />
          <main className='manag_main'>
            <NavBar />
            <Outlet></Outlet>
          </main>
        </div>)
    } else {
      return <Navigate to={'/login'} />
    }
  }else {
    return <Navigate to={'/login'} />
  }


  // if (localStorage.getItem('token')) {
  //   const tokenStorage = localStorage.getItem('token')
  //   const decodetoken = jwt_decode(tokenStorage)
  //    if(decodetoken.userinfo.isAdmin){
  //     return(
  //       <div className='manag-screen'>
  //         <SideBar />
  //         <main className='manag_main'>
  //           <NavBar />
  //           <Outlet></Outlet>
  //         </main>
  //       </div>)
  //       }else{
  //         return <Navigate to={'/login'} />
  //       }
  //   }else{
  //         return <Navigate to={'/login'} />
  //       }
}

export default ManagLayout