import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return <>
    <Navbar/>
     <div className="container my-100 ">
      <Offline>
        <div className="overlay">
          Oops You are Offline !
        </div>
      </Offline>
      <Outlet></Outlet>
     </div>
    <Footer/>
  </>
}
