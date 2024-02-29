import React, { useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {

  const [loading, setLoading] = useState(false);
  const [apiErorr, setApiErorr] = useState(null);
  let navigate = useNavigate()
  

  /*************** post register api ********************** */

  async function registerSubmit(values) {
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch(
      (err)=>{
        setApiErorr(err.response.data.message);
        setLoading(false);
      }
    );
    // console.log(data);
    if (data.message == 'success')/**will be work in then state (if there is no error to catch) */ {
      setLoading(false);
      navigate('/login');
    }
  }


   /************* validation manually ************* */

  // function validate(values) {
  //   let errors ={ }

  //   if (!values.name) {
  //     errors.name='Name is Required';
  //   }
  //   else if (values.name.length < 3) {
  //     errors.name='min length is 3';
  //   }
  //   else if (values.name.length > 10) {
  //     errors.name='max length is 10';
  //   }

  //   if (!values.password) {
  //     errors.password='password is Required';
  //   }
  //   else if (/^[A-Z][\w @]{5,8}$/.test(values.password)) {
  //     errors.password='invalid password ex( Ahmed@123 )';
  //   }

  //   return errors
  // }

  /*******************  using Validation Schema for Yup ***** */
 
  let validationSchema =Yup.object(
    {
      name: Yup.string().required('Name is Required').min(3 , 'min length is 3').max(10 , 'max length is 10'),
      email: Yup.string().required('Email is Required').email('invalid Email'),
      password: Yup.string().required('Password is Required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password ex( Ahmed@123 )'),
      rePassword: Yup.string().required('rePassword is Required').oneOf([Yup.ref('password')] , 'password and repassword don\'t match'),
      phone: Yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/ , 'we need egyptian number'),
    }
  )


  let formik=useFormik(
    {
      initialValues:{
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
      },validationSchema
      ,onSubmit:registerSubmit
    }
  )

  return <>
     <div className="w-75 mx-auto py-4 vh-83">
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>

          {apiErorr? <div className="alert alert-danger">{apiErorr}</div>:''}

          <label htmlFor="name">Name :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name'className=' form-control mb-3' /> {/* name attribute reffer to the name input in the above object*/}
          {formik.errors.name && formik.touched.name?  <div className="alert alert-danger py-2">{formik.errors.name}</div> : ''}

          <label htmlFor="email">email :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='email' name='email' className=' form-control mb-3' />
          {formik.errors.email && formik.touched.email?  <div className="alert alert-danger py-2">{formik.errors.email}</div> : ''}

          <label htmlFor="password">password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='password' name='password' className=' form-control mb-3' />
          {formik.errors.password && formik.touched.password?  <div className="alert alert-danger py-2">{formik.errors.password}</div> : ''}


          <label htmlFor="repassword">rePassword :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='rePassword' name='rePassword' className=' form-control mb-3' />
          {formik.errors.rePassword && formik.touched.rePassword?  <div className="alert alert-danger py-2">{formik.errors.rePassword}</div> : ''}

          <label htmlFor="phone">phone :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='phone' name='phone' className=' form-control mb-3' />
          {formik.errors.phone && formik.touched.phone?  <div className="alert alert-danger py-2">{formik.errors.phone}</div> : ''}

          {loading? <button type='button' className='btn bg-main text-light'>
            <i className='fas fa-spinner fa-spin'></i>  
            </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>      
          }

          <Link className='ps-3' to={'/login'}>Login Now</Link>
            
        </form>
     </div>
  </>
}
