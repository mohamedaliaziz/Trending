import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import * as Yap from 'yup'


export default function Login({saveUserData}) {
  let validation = Yap.object({
    email: Yap.string().required('Email is required').email('Email invalid'),
    password: Yap.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/, 'password must start with capital letter'),
  })
  let navigate = useNavigate()
  const [error, setError] = useState('');
  const [loding, setloding] = useState(false);
 async function handelLogin(values){
  setloding(true)
 let {data} = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`,values).catch((error)=>{
  setError(error?.response?.data?.errors?.param + ': ' + error?.response?.data?.errors?.msg)
  setloding(false)
console.log(error)
 })
 if(data?.message == 'success'){
  localStorage.setItem('userToken',data.token)
  saveUserData()
  setloding(false)
  setError(data?.message)
  navigate('/')
  // console.log(data?.message)
 }
    // console.log(data)
  }
  let formik = useFormik({
    initialValues: {

      email:'',
      password:'',

    },
    onSubmit:handelLogin,
    validationSchema: validation

    
  })
  return <>
  
  
  <div className='w-75 mx-auto'>
    <h2 className="my-3">Login Now</h2>
    {error?<div className='alert-danger alert'>{error}</div>:null}
    <form className='form' onSubmit={formik.handleSubmit}>
  
       <label htmlFor='email'>Email :</label>
      <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' className='form-control' />
      {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:''}

      <label htmlFor='password'> password:</label>
      <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' name='password' className='form-control' />
      {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:''}

 

   
  {!loding?<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn my-4 btn-info'>Login</button>:<button type='submit' className='btn my-4 btn-info'><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>} 
      
    </form>
  </div>
  
  
  
  
  
  
  
  
  
  
  </>
}
