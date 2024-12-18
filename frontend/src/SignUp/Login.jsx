import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

export default function Login() {
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate()


const handleLogin = async (e)=> {
    // e.preventDefault(); 

    try {
        const response = await axios.post("http://localhost:3000/user/login", {
            email, 
            password
        }); 

        if(response.status === 200) {
          const {token, user} =response.data; 
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", JSON.stringify(token))
        }
        navigate('/')

    } catch (err) {
        console.error(err);
        if (err.response.data.message === "Invalid credentials") {
            setError("Incorrect password. Please try again.");
        } else {
            setError("An error logining in ");
        }
    }
} 

  return (
    <div className='login-up-main-div'>
      <h1 className='login-h1'>login</h1>
      <div>
          <label htmlFor="name" className='login-label'> enter email </label>
          <input type="text" onChange={(e)=>{setemail(e.target.value)}} placeholder='enter your email'/>
      </div>

      <div>
          <label htmlFor="name" className='password-label'> enter password </label>
          <input type="text"  onChange={(e)=>{setpassword(e.target.value)}} placeholder='enter your email'/>
      </div>

      <button onClick={()=>{
       handleLogin()
      }}>Login</button>
    </div>
  )
}
