import React, { useEffect , useContext, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {

  

  let {getCartItems , deleteCartItem , updateCartItems , clearCart , setCountItem , CountItem} = useContext(CartContext); 
  const [cart , setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearFlag, setClearFlag] = useState(false);
  


  async function getItems() {
    try {
      let {data ,status} = await getCartItems();
      setCart(data);
      setCountItem(data?.numOfCartItems)
      setLoading(false);
      setClearFlag(false);
    } 
    catch (error) {
      console.error("Error occurred while fetching cart items:", error);
      setCountItem(0);
      setCart(null);
      setLoading(false);
      setClearFlag(false); // Set countItem to 0 in case of an error
    }
}

  async function deleteItem(id) {
    setLoading(true);
    let {data} = await deleteCartItem(id);
    setCountItem(CountItem-1)
    setCart(data);
    setLoading(false)
  }


  async function updateCart(id ,count) {
    if (count < 1) {
      deleteItem(id);
    }
    else{
      // setLoading(true);
      let {data} = await updateCartItems(id,count);
      setCart(data);
      // setLoading(false);
    }
  }

  async function clearUserCart() {
    setLoading(true);
    let respnose = await clearCart();
    setCart(null);
    setClearFlag(true);
    setCountItem(0);
    setLoading(false);
  }

  useEffect(()=>{
    getItems()
  } ,[])

  return <>

  <div className='bg-main-light mt-5 p-2'>
  { <>
       {
         loading ?
     <div className="row justify-content-center align-items-center vh-100 ">
         <div className='text-center'>
             <i className='fas fa-spinner fa-spin fa-3x'></i>
         </div>
     </div>
    : <>
      {cart? 
        <>
        <div className="header d-flex justify-content-between pt-3">
        <div className="right ps-4 ">
          <p className='text-main  fw-bold'> Number Of Cart Items : {cart?.numOfCartItems} </p>
          <p className='text-main  fw-bold'> Total Price : {cart?.data?.totalCartPrice} EGP</p>
        </div>
        <div className="left pe-4">
          <div className="clearBtn">
            <button onClick={()=> clearUserCart()} className='btn btn-light bordr'>Clear Your Cart</button>
          </div>
        </div>
      </div>
      
      <div className="content">
      { cart.data.products.map(product => <div key={product.product.id} className="row align-items-center m-0 p-2 border-1 border-bottom">
        <div className="col-md-1">
            <div className="img">
              <img src={product.product.imageCover} className='w-100' alt={product.product.title}  />
            </div>
        </div>
        <div className="col-md-10">
          <h3 className='h6 fw-bold '>{product.product.title.split(" ").slice(0,3).join(" ")}</h3>
          <p className='text-main fw-bold mb-2'>Price : {product.price} EGP</p>
          <button onClick={()=> deleteItem(product.product.id)} className='btn px-0'> <i className='fas fa-trash-can text-danger me-2'></i>Remove</button>
        </div>
        <div className='col-md-1'>
            <div className="count">
              <button onClick={()=> updateCart(product.product.id , product.count +1)} className='btn bordr py-1 px-2'>+</button>
              <span className='p-2'>{product.count}</span>
              <button onClick={()=> updateCart(product.product.id , product.count -1 )}  className='btn bordr py-1 px-2'>-</button>
            </div>
        </div>
      </div>)
     }
          <div className="button text-center">
            <Link className='btn bg-main text-light m-3' to={`/shippingaddress/${cart.data._id}`}>Online Payment</Link>  
          </div>
      </div>   
      
      </>
        : <div className="right ps-4 ">
          <p className='text-main  fw-bold'> your cart is empty </p>
          </div>
      }
    </>    
     }
    
       </>
        }
  </div>
  </>
}
