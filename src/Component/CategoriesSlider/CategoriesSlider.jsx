import React from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    autoplay:true,
    autoplaySpeed:2000,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows:false
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((response)=> response)
  .catch((err)=> err)
  }

  let {data}= useQuery('Categories' , getCategories); 
  // console.log(data?.data.data);

  return <>
    
    <div className="row">
     <Slider {...settings}/** dynamic parameters */>
        {data?.data.data.map((category,index) => <div key={index} className="col-md-2">
          <Link to={`/subcategory/${category._id}`}>
          <div className="image">
            <img src={category.image} className='w-100' height={200} alt={category.name} />
            <p className='text-center bg-body-tertiary'>{category.name}</p>
          </div>
          </Link>
        </div> )}
      </Slider>
    </div>
    

  </>
}
