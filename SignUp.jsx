import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignUpValidation'
import axios from 'axios'
import toast from 'react-hot-toast'


const api = axios.create({ baseURL: 'http://localhost:8080' });



const initialState = {
  name:'',
  email:'',
  password:''
}

function SignUp() {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()


    const handleInput=(event) => {
        setValues(prev=>({...prev,[event.target.name]: event.target.value }))
    }
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors(Validation(values))
      try {
        const { data } = await api.post("/api/v1/user/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        });
        console.log("data =============>", data)

        if (data.success) {
          toast.success("User Register Successfully");
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    
//      setErrors(Validation(values))

  return (
    <div className='flex flex-col items-center'> <h1 className='text-2xl font-black '>Sign-Up</h1>
      <div className='bg-indigo-300 w-1/3 flex flex-col items-center'>
        <form action="" onSubmit={handleSubmit}>
            <div className='flex flex-col items-start'>
            <label htmlFor="Name" className='ml-6'>Name</label>
            <input type="name" placeholder='Name' className='rounded text-black-500 my-5 mx-6' name='name'  onChange={handleInput}/>
            {errors.name && <span className='text-rose-600'>{errors.name}</span>}
            </div>

            <div  className='flex flex-col items-start' >
                <label htmlFor="Email" className='ml-6'>Email</label> 
                <input type="email" placeholder='Email' className='rounded text-black-500 my-5 mx-6' name='email'  onChange={handleInput}/>
                {errors.email && <span className='text-rose-600'>{errors.email}</span>}
            </div >
            
            <div className='flex flex-col items-start'>
                <label htmlFor="Password" className='ml-6'>Password</label> 
                <input type="password" placeholder='Password' className='rounded text-black-500 my-5 mx-6' name='password'  onChange={handleInput}/>
                {errors.password && <span className='text-rose-600'>{errors.password}</span>}
            </div>
            <button><Link to="/" className='font-bold' >Log In</Link></button> <br /> <br />
            <button type='submit' className='font-bold'>Sign Up</button>
            
        </form>
      </div>
    </div>
  )
}

export default SignUp
