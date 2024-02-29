import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';

export default function ShippingAddress() {
  let {cartId} = useParams()
    
  let {checkOutSession} =useContext(CartContext)

  async function checkOut(values) {
    console.log(values);
    let {data}= await checkOutSession(cartId,values)
    // console.log(data);
    if (data.status =='success') {
      window.location.href= data.session.url;
    }
  }

  let formik = useFormik({
    initialValues:{
      phone:'',
      phone:'',
      city:''
    }, onSubmit: checkOut
  })

  return <>
    <h2>ShippingAddress</h2>
    <div className="w-75 mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details">Detailes</label>
        <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3'/>
        <label htmlFor="phone">Phone</label>
        <input onChange={formik.handleChange} type="text" id='phone' name='phone' className='form-control mb-3'/>
        <label htmlFor="city">City</label>
        <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3'/>
        <button className='btn bg-main text-light' type='submit'>Checkout</button>
      </form>
    </div>
  </>
}
