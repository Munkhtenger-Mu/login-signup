import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
import {useDispatch} from "react-redux"
import {authActions} from "../redux/store"
import toast from 'react-hot-toast'
const api = axios.create({ baseURL: 'http://localhost:8080' });



function Login() {

const [values, setValues] = useState({
    email:'',
    password:''
})

const [errors, setErrors] = useState({})

const navigate = useNavigate()
const dispatch = useDispatch()


const handleInput = (e) => {
  setValues((prevState) => ({
    ...prevState,
    [e.target.name]: e.target.value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors(Validation(values))
  try {
    const { data } = await api.post("/api/v1/user/login", {
      email: values.email,
      password: values.password,
    });
    if (data.success) {
      localStorage.setItem("userId", data?.user._id);
      dispatch(authActions.login())
      
      toast.success("User login Successfully");
      navigate("/books");
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className='flex items-center flex-col'><h1 className='text-2xl font-black '>Log-In</h1>
      <div className='bg-indigo-300 w-96 rounded '>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col items-start' >
                <label htmlFor="Email" className='ml-6'>Email</label> <br />
                <input type="email" placeholder='Email' name='email' onChange={handleInput} className='rounded text-black-500 mx-6' />
                {errors.email && <span className='text-rose-600'>{errors.email}</span>}
            </div>
            <div className='flex flex-col items-start'>
                <label htmlFor="Password" className='ml-6'>Password</label> <br />
                <input type="" placeholder='Password' name='password' onChange={handleInput} className='rounded text-black-500 mx-6' />
                {errors.password && <span className='text-rose-600 ' >{errors.password}</span>}
            </div>
            <button type='submit' className='font-bold' >Log In</button> <br /> <p>Don't have an account?</p>
            <button><Link to="/signUp" className='font-bold'>Sign Up</Link></button>
        </form>
      </div>
    </div>
  )
}

export default Login
