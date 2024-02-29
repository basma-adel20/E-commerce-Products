import React from 'react'
import style from './BrandDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

export default function BrandDetails(props) {

  let {id} = useParams();

  async function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }

  let {data, isLoading} = useQuery('Brands' , getBrands );

  console.log(data?.data);

  return <>
    <h2 className='p-2 bg-body-secondary my-2 text-center'>Brand Detailss</h2>
    {isLoading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <>
    <div className="row align-items-center p-4 bg-body-tertiary shadow my-5">
        <div className="col-md-4">
          <img src={data?.data.data.image} alt={data?.data.data.name} className='w-100' />
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3 className='h4'>{data?.data.data.name}</h3>
          </div>
        </div>
    </div>
    

    <Helmet>
    <meta charSet="utf-8" />
    <title>{data?.data.name}</title>
    </Helmet>
    </>
    }
  </>
}
