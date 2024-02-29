import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { WishListContext } from '../../Context/WishListContext.js';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';


export default function Brands() {


  async function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {data, isLoading} = useQuery('Brands' , getBrands );

  console.log(data?.data.data);

  return <>
    <h2 className='p-2 bg-body-secondary my-2 text-center'>Brands</h2>    
    {isLoading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <div className="row gy-4">
      {data?.data.data.map(( brand, index)  => 
        <div key={index} className="col-lg-3">
            <div className="product categoryBordr p-2">
             <Link to={`/branddetailes/${brand._id}`}>
                <img src={brand.image} alt={brand.title} className='w-100' />
                <span className='font-sm text-main fs-5 ps-1'>{brand.name}</span>
              </Link>
            </div>
      </div>
      )}
    </div> }
  </>
}
