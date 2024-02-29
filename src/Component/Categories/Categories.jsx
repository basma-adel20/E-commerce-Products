import React from 'react'
import style from './Categories.module.css'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx'
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories() {

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((response)=> response)
  .catch((err)=> err)
  }

  let { data, isLoading, error } = useQuery('Categories' , getCategories); 

  return <>
    {isLoading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    :<>
    <h2 className='p-2 bg-body-secondary my-3 text-center'>Categories</h2>
    <div className="row g-4 my-3">
      {data?.data.data.map(category => <div key={category._id} className="col-md-4">
      <Link to={`/subcategory/${category._id}`}>
          <div className="categoryItem categoryBordr">
              <img src={category.image} alt="" className='w-100' height={300}/>
              <p className='text-main h3 text-center p-2 bg-white'>{category.name}</p>
              {console.log(category._id)}
            </div>
        </Link>
      </div>)}
    </div>
    </>
  }
  </>
  
}
