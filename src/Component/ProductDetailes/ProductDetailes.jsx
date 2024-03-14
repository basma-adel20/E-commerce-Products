import React, { useEffect, useState } from 'react'
import style from './ProductDetailes.module.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import {Helmet} from "react-helmet";

export default function ProductDetailes() {

  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false
  };

  let {id} = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  
  async function getProductDetails(id) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data);
    setLoading(false);
  }

  
  useEffect(()=>{
   getProductDetails(id)
  },[])


  return <>

    <h2 className='p-2 bg-body-secondary my-2 text-center'>Product Details</h2>
    {loading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <>
    <div className="row align-items-center">
        <div className="col-md-4">
        <Slider {...settings}>
              {details.images.map(image => <img key={details.id} src={image} alt={details.title} className='w-100' />)}
          </Slider>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3 className='h5'>{details.title}</h3>
            <p className='py-3'>{details.description}</p>
            <span className='font-sm text-main'>{details.category.name}</span>
            <div className="d-flex py-3 justify-content-between align-items-center">
              <span className='font-sm'>{details.price} EGP</span> 
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {details.ratingsAverage}  
              </span> 
            </div>
            <button className='btn bg-main text-main-light w-100 btn-sm'>Add To Cart</button>

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
