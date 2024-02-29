import React, { useContext, useEffect } from 'react'
import Navbar from './Component/Navbar/Navbar.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout.jsx'
import Home from './Component/Home/Home.jsx'
import Brands from './Component/Brands/Brands.jsx'
import Cart from './Component/Cart/Cart.jsx'
import Products from './Component/Products/Products.jsx'
import Categories from './Component/Categories/Categories.jsx'
import Login from './Component/Login/Login.jsx'
import Register from './Component/Register/Register.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import CounterContextProvider from './Context/CounterContext.js'
import { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetailes from './Component/ProductDetailes/ProductDetailes.jsx'
import toast, { Toaster } from 'react-hot-toast';
import CategoryDetailes from './Component/CategoryDetailes/CategoryDetailes.jsx'
import WishList from './Component/WishList/WishList.jsx'
import BrandDetails from './Component/BrandDetails/BrandDetails.jsx'
import UserProfile from './Component/UserProfile/UserProfile.jsx'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'

export default function App() {

  let routers = createBrowserRouter([
    {path:'' ,element: <Layout/>, children :
      [
        {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
        {path:'allorders' , element:<ProtectedRoute><Home/> </ProtectedRoute>},
        {path:'/shippingaddress/:cartId' , element:<ProtectedRoute><ShippingAddress/> </ProtectedRoute>},
        {path:'register' , element:<Register/>},
        {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
        {path:'productdetailes/:id' , element:<ProtectedRoute><ProductDetailes/></ProtectedRoute>},
        {path:'branddetailes/:id' , element:<ProtectedRoute><BrandDetails/> </ProtectedRoute>},
        {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:'subcategory/:id' , element:<ProtectedRoute> <CategoryDetailes/> </ProtectedRoute>},
        {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
        {path:'wishlist' , element:<ProtectedRoute><WishList/> </ProtectedRoute>},
        {path:'userprofile' , element:<ProtectedRoute><UserProfile/> </ProtectedRoute>},
        {path:'login' , element:<Login/>},
        {path:'*' , element:<NotFound/>}
      ]
    }
  ])

  let {setUserToken} = useContext(UserContext);
  
  useEffect(()=>{if (localStorage.getItem('userToken')) {
    setUserToken(localStorage.getItem('userToken'))
  }},[])

  return <>
    <CounterContextProvider>
       <RouterProvider router={routers}></RouterProvider> {/** send all the components to the context * */}
      <Toaster></Toaster>
    </CounterContextProvider>
  </>
}
