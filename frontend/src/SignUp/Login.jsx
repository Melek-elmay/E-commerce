import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate()


const handleLogin = async (e)=> {
    e.preventDefault(); 

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
    } catch (err) {
        console.error(err);
        if (err.response.data.message === "Invalid credentials") {
            setError("Incorrect password. Please try again.");
        } else {
            setError("An error occurred during login. Please try again later.");
        }
    }
}  

  return (
    <div>Login</div>
  )
}
