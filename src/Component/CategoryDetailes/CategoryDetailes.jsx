import React, { useEffect, useState } from 'react'
import style from './CategoryDetailes.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function CategoryDetailes() {
  
  let {id} = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([true]);
  
  async function getCategory(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
    console.log(data);
    setCategory(data?.data);
    setLoading(false);
  }

  async function getSubCategories(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setDetails(data?.data);
    setLoading(false);
  }

  
  useEffect(()=>{
    getCategory(id);
    getSubCategories(id)
  },[])


  return <>
    <h2 className='p-2 bg-body-secondary my-2 text-center'>SubCategories</h2>
    {loading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <>
    <div className="row align-items-center p-2 bg-body-tertiary shadow my-5">
        <div className="col-md-4">
          <img src={category.image} alt={category.name} className='w-100' />
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3>{category.name}</h3>
            {details.length!=0 ? <>
              <p className='py-3 ps-2'>SubCategories :</p>
              <ul className='d-flex g-3 flex-wrap ps-0'>
               {details.map(sub => <span className='alert alert-dark m-2 p-2'>{sub.name}</span> )}
              </ul>
              </>
            : 
             <><p className='py-3'>There is no subcategories</p></>
            }
          </div>
        </div>
    </div>
    

    <Helmet>
    <meta charSet="utf-8" />
    <title>{details.title}</title>
    </Helmet>
    </>
    }
  </>
}
