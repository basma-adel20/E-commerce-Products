import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../Assets/images/freshcart-logo.svg'
import {Link, useNavigate} from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext.js'
import { UserContext } from '../../Context/UserContext.js'
import { CartContext } from '../../Context/CartContext.js'
import account from '../../Assets/images/icons8-user-location-50.png'

export default function Navbar() {

  let {count} = useContext(CounterContext)
  let {CountItem} = useContext(CartContext)

  let {userToken , setUserToken} = useContext(UserContext)
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('login')
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand" to={'/'}>
      <img src={logo} alt="fresh cart"/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
       
       {userToken != null ? <>
        <li className="nav-item">
          <Link className="nav-link" to={'/'}>Home {/**count */}</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'brands'}>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'wishlist'}>
              <i className="fa-solid fa-heart"></i> Favourites
          </Link>
        </li>
        
       </> : ''}
        
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
        {userToken == null ? <>
          <li className="nav-item">
          <Link className="nav-link" to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'login'}>Login</Link>
        </li>
        </> 
        :
          <>
          <li className="nav-item">
            <Link className="nav-link" to={'cart'}>
              <div className="parent position-relative">
                 <i className="fa-solid fa-cart-shopping text-main fa-cart"></i>
                 <span className='text-white position-absolute count-box'>{CountItem}</span>
              </div>
              
            </Link>
          </li>

          <li className="nav-item">
          <Link className="nav-link pt-0" to={'userprofile'}>
              <img src={account} className='profile' alt="" />
            </Link>
          </li>

        
            <li className="nav-item">
              <span className="nav-link cursor-pointer" onClick={logOut}>LogOut</span>
            </li>
          </>
        
        }
       
         
      </ul>
    </div>
  </div>
</nav>
  </>
}
