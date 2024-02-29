import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'

export default function Login() {

  const [loading, setLoading] = useState(false);
  const [apiErorr, setApiErorr] = useState(null);
  let navigate = useNavigate()
  let {setUserToken , setName , setEmail} = useContext(UserContext);

  /*************** post register api ********************** */

  async function loginSubmit(values) {
    setLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch(
      (err)=>{
        setApiErorr(err.response.data.message);
        setLoading(false);
      }
    );

    // console.log(data);
    if (data.message == 'success')/**will be work in then state (if there is no error to catch) */ {
      setLoading(false);
      setName(data.user.name);
      setEmail(data.user.email);
      localStorage.setItem('userToken',data.token);
      localStorage.setItem('userName',data.user.name);
      setUserToken(data.token);
      navigate('/');
    }
  }

  let validationSchema =Yup.object(
    {
      email: Yup.string().required('Email is Required').email('invalid Email'),
      password: Yup.string().required('Password is Required').matches(/^[A-Z][\w @]{5,8}$/, 'invalid password ex( Ahmed@123 )'),
     }
  )


  let formik=useFormik(
    {
      initialValues:{
        email:'',
        password:''
      },validationSchema
      ,onSubmit:loginSubmit
    }
  )

  return <>
     <div className="w-75 mx-auto py-4 vh-83">
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>

          {apiErorr? <div className="alert alert-danger">{apiErorr}</div>:''}

          <label htmlFor="email">email :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='email' name='email' className=' form-control mb-3' />
          {formik.errors.email && formik.touched.email?  <div className="alert alert-danger py-2">{formik.errors.email}</div> : ''}

          <label htmlFor="password">password :</label>
          <input onBlur={formik.handleBlur} onChange={formik.handleChange}  type="text" id='password' name='password' className=' form-control mb-3' />
          {formik.errors.password && formik.touched.password?  <div className="alert alert-danger py-2">{formik.errors.password}</div> : ''}


          {loading? <button type='button' className='btn bg-main text-light'>
            <i className='fas fa-spinner fa-spin'></i>  
            </button> :<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Login</button>      
          }

          <Link className='ps-3' to={'/register'}>Register Now</Link>
           
        </form>
     </div>
  </>
}
