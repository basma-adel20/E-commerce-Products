import style from './Products.module.css'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { WishListContext } from '../../Context/WishListContext.js';
import { CartContext } from '../../Context/CartContext.js';
import toast from 'react-hot-toast';

export default function Products() {

  async function getProducts() {
    await getWishList();
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  

  let {data, isLoading ,isError , isFetching , refetch} = useQuery('Products' , getProducts );

  let {addToCart ,setCountItem , CountItem , getCartItems} = useContext(CartContext)

  let {addToWishList , getWishItems , deleteWishItem} = useContext(WishListContext);

  const [WishList, setWishList] = useState(null);
  const [flagWish, setflagWish] = useState(false);
  const [productWishList, setProductWishList] = useState({});  

  
  async function getCart() {
    try {
        const response = await getCartItems();
        if (response && response.data && response.data.numOfCartItems !== undefined) {
            setCountItem(response.data.numOfCartItems);
        } else {
            setCountItem(0); // No data or numOfCartItems undefined
        }
    } catch (error) {
        console.error("Error occurred while fetching cart items:", error);
        setCountItem(0); // Set countItem to 0 in case of an error
    }
}


  async function getWishList() {
    let {data} = await getWishItems();
    setWishList(data?.data);

    const storedProductWishList = JSON.parse(localStorage.getItem('productWishList')) || {};
    setProductWishList(storedProductWishList);

  }
  //make this fun because we need it to await for  the addtocart to finish 
  async function postToCart(id) {
    let {data} = await addToCart(id);
    await getCart();
    if (data.status == 'success') {
      toast.success(data.message , {
        duration: 2000,
        icon: '👏',
        style: {
          background: '#363636',
          color: '#fff',
        },
        position:'top-right'
      })
    }
  }

  useEffect(()=>{getWishList()} , [])

  async function postToWishList(id) {
    let {data} = await addToWishList(id);
    if (data.status == 'success') {
      toast.success(data.message , {
        duration: 2000,
        icon: '👏',
        style: {
          background: '#363636',
          color: '#fff',
        },
        position:'top-right'
      });
      const updatedProductWishList = {
        ...productWishList,
        [id]: true,
      };
      setProductWishList(updatedProductWishList);
      // Store updated wishlist status in localStorage
      localStorage.setItem('productWishList', JSON.stringify(updatedProductWishList));
    

    }
  }

  async function deleteItem(id) {
    let {data} = await deleteWishItem(id);
    if (data.status === 'success') {
      toast.error(data.message , {
        duration: 2000,
        // icon: '👏',
        style: {
          background: '#363636',
          color: '#fff',
        },
        position:'top-right'
      });

    const updatedProductWishList = { ...productWishList };
    delete updatedProductWishList[id];
    setProductWishList(updatedProductWishList);

    // Update localStorage
    localStorage.setItem('productWishList', JSON.stringify(updatedProductWishList));
    await getProducts();
    }

  }

  function changeIcon() {
    {
      document.querySelector('.addTowish').innerHTML= ` <i class="fa-solid fa-heart-circle-minus fa-2x cursor-pointer text-danger"></i>`
    }
  }

  return <>
    <h2 className='p-2 bg-body-secondary my-2 text-center'>Products</h2>
    {/* <button onClick={refetch}>getProducts</button> */}
    
    {isLoading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <div className="row gy-4">
      {data?.data.data.map(product  => 
        <div key={product.id} className="col-lg-3">
            <div className="product p-2">
            <Link to={`/productdetailes/${product.id}`}>
              <img src={product.imageCover} alt={product.title} className='w-100' />
              <span className='font-sm text-main'>{product.category.name}</span>
              <h3 className='h5'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
              <div className="d-flex py-3 justify-content-between align-items-center">
                <span className='font-sm'>{product.price} EGP</span> 
                <span className='font-sm'>
                  <i className='fas fa-star rating-color me-1'></i>
                  {product.ratingsAverage}  
                </span> 
              </div>
              </Link>
              <div className="btns d-flex justify-content-center">
                <button onClick={()=> postToCart(product.id)} className='btn bg-main text-main-light w-75 btn-sm'>Add To Cart</button>
                
                {
                    productWishList[product.id] ? (
                      <div className="removeFromWish ms-2" onClick={() => deleteItem(product.id)}>
                        <i className="fa-solid fa-heart-circle-minus fa-2x cursor-pointer text-danger"></i>
                      </div>
                    ) : (
                      <div className="addTowish ms-2" onClick={() => postToWishList(product.id)}>
                        <i className="fa-solid fa-heart-circle-plus fa-2x cursor-pointer to-red"></i>
                      </div>
                    )
                  }
            </div>
            </div>
      </div>
      )}
    </div> }
  </>
}
