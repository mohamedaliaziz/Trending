import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import * as Yap from 'yup'

export default function Register() {
  let validation = Yap.object({
    name: Yap.string().required('name is repuired').min(3,'minimum name is 3 char').max(20,'maximum name is 20 char'),
    email: Yap.string().required('Email is required').email('Email invalid'),
    password: Yap.string().required('password is required').matches(/^[A-Z][a-z0-9]{3,10}$/, 'password must start with capital letter'),
    rePassword: Yap.string().required('rePassword is pequired').oneOf([Yap.ref('password')], 'repassword dont match'),
    phone: Yap.string().required('phone is required').matches(/^01[1250][0-9]{8}$/, 'phone invalid')
  })






  let navigate = useNavigate()
  const [error, setError] = useState('');
  const [loding, setloding] = useState(false);
  async function handelRegister(values) {
    setloding(true)
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values).catch((error) => {
      setError(error?.response?.data?.errors?.param + ': ' + error?.response?.data?.errors?.msg)
      setloding(false)
      console.log(error)
    })
    if (data.message == 'success') {
      setloding(false)
      navigate('/login')
      setError(data.message)
      console.log(data?.message)
    }
    // console.log(data)
  }
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: handelRegister,
    validationSchema: validation

  })
  return <>


    <div className='w-75 mx-auto'>
      <h2 className="my-3">Register Now</h2>
      {error ? <div className='alert-danger alert'>{error}</div> : null}
      <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>name :</label>
        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='name' name='name' className='form-control' />
        {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:''}

        <label htmlFor='email'>Email :</label>
        <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' className='form-control' />
        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:''}

        <label htmlFor='password'> password:</label>
        <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='password' name='password' className='form-control' />
        {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:''}
        
        <label htmlFor='rePassword'>rePassword :</label>
        <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} id='rePassword' name='rePassword' className='form-control' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:''}
        
        <label htmlFor='phone'>phone :</label>
        <input type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='phone' name='phone' className='form-control' />
        {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:''}
        

        {!loding ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn my-4 btn-info'>Register</button> : <button type='submit' className='btn my-4 btn-info'><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></button>}

      </form>
    </div>










  </>
}
