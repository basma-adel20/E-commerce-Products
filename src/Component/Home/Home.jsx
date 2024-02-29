import React, { useContext, useState } from 'react'
import { CounterContext } from '../../Context/CounterContext.js'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx'
import {Helmet} from "react-helmet";


export default function Home() {

  let {changeCount}= useContext(CounterContext)
  return <>
  {/* <h2> Home</h2>
  <button onClick={changeCount} className='btn bg-main'>change</button>
   */}
   <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Cart</title>
    </Helmet>
   <MainSlider></MainSlider>
   <CategoriesSlider></CategoriesSlider>
   <FeaturedProducts></FeaturedProducts>
  </>
}
