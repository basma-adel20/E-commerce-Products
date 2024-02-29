import style from './WishList.module.css'
import React, { useEffect , useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext.js'
import {WishListContext}from '../../Context/WishListContext';
import toast from 'react-hot-toast';


export default function WishList() {
  

  let {addToCart , setCountItem , CountItem} = useContext(CartContext); 
  let {deleteWishItem , getWishItems}=  useContext(WishListContext);

  const [wishList , setWishList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearFlag, setClearFlag] = useState(false);
  
  const [productWishList, setProductWishList] = useState({});  

  

  async function getItems() {
    let {data ,status} = await getWishItems();
    // console.log(data);
    // console.log(data);
    if (status == 200) {
      console.log(data);
      setWishList(data);
      setLoading(false);
      setClearFlag(false);
    }
    else {
      setWishList(null);
      setLoading(false);
      setClearFlag(false);
    }

    const storedProductWishList = JSON.parse(localStorage.getItem('productWishList')) || {};
    setProductWishList(storedProductWishList);
  }


  async function deleteItem(id) {
    setLoading(true);
    let {data} = await deleteWishItem(id);
    await getItems();
    setLoading(false)
    const updatedProductWishList = { ...productWishList };
    delete updatedProductWishList[id];
    setProductWishList(updatedProductWishList);

    // Update localStorage
    localStorage.setItem('productWishList', JSON.stringify(updatedProductWishList));
  }

  async function postToCart(id) {
    setCountItem(CountItem+1);
    let {data} = await addToCart(id);
    if (data.status == 'success') {
      toast.success(data.message , {
        duration: 2000,
        icon: '👏',
      })
    }
  }

  useEffect(()=>{
    getItems()
  } ,[])

  return <>

  <div className='bg-main-light mt-5 p-2'>
  { <>
       {loading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <>
      {(wishList && wishList.count>0)? 
      <>
      <div className="header d-flex justify-content-between pt-3">
      <div className="right ps-4 ">
        <h2>My Wish List</h2>
        <p className='text-main  fw-bold'> Number Of favourite Items : {wishList?.count} </p>
      </div>
    </div>
    { wishList.data.map(product => <div key={product.id} className="row align-items-center m-0 p-2 border-1 border-bottom">
       <div className="col-md-1">
          <div className="img">
            <img src={product.imageCover} className='w-100' alt={product.title}  />
          </div>
       </div>
       <div className="col-md-9">
        <h3 className='h6 fw-bold '>{product.title.split(" ").slice(0,3).join(" ")}</h3>
        <p className='text-main fw-bold mb-2'>Price : {product.price} EGP</p>
        <button onClick={()=> deleteItem(product.id)} className='btn px-0'> <i className='fas fa-trash-can text-danger me-2'></i>Remove</button>
       </div>
       <div className='col-md-2'>
          <div className="count">
            <button onClick={()=> postToCart(product.id)} className='btn btn-light bordr'>Add to Cart</button>
           </div>
       </div>
    </div>)
    } </>
      : <div className="right ps-4 ">
      <p className='text-main  fw-bold'> your Wish List is empty </p>
    </div>}
    </>    
     }
       </>
        }
  </div>
  </>
}
