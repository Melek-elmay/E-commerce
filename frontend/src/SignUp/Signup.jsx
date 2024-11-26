import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Signup.css'

export default function Signup() {
    const [userName, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [image, setimage] = useState(null);
    const [error, seterror] = useState("");


const navigate= useNavigate()



const handleImageUpload = async (e) => {
    e.preventDefault(); 
    const data = new FormData()
    data.append('file', image); 
    data.append('upload_preset', 'ecommerce'); 
    data.append('cloud_name','dpqkzgd5z')
    console.log(image)

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload",data)
      setimageUrl(response.data.secure_url)
      console.log(response.data)
    } catch (error) {
      console.log("Error uploading image to cloudinary", error)
    }
 }; 


 
//  const validatePassword = (password) => {
//     const errors = [];
//     if (password.length < 8) {
//         errors.push("password must contain at least 8 charaterees");
//     }

//     return {
//         isValid: errors.length === 0,
//         errors: errors
//     };
// };

const handleAddUser = async () => {
    try {
        // const passwordValidation = validatePassword(password);
        // if (!passwordValidation.isValid) {
        //     seterror("Password is too weak");
        //     passwordValidation.errors.forEach((err) =>
        //         seterror((element) => element + "  " + err)
        //     );
        //     return;
        // }

        const response = await axios.post(
            "http://localhost:3000/user/signup",
            {
                userName,
                email,
                password,
                image: imageUrl,
            },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log(response.data);
        seterror('');
        navigate("/user/login");
    } catch (err) {
        if (err.response?.data === "User already exists") {
            seterror("Email address is already registered. Please use a different email.");
        } else {
            console.log(err);
            seterror("An error occurred signup");
        }
    }
};



  return (
    <div className='sign-up-main-div'>
        <h2>sign up</h2>
        <div>
            <label htmlFor="fullName" className='signup-label'>name</label>
            <input type="text" onChange={(e)=>{setuserName(e.target.value)} }  placeholder= "enter your full name"/>
        </div>

        <div>
            <label htmlFor="email" className='signup-label'> enter email </label>
                <input type="text"  onChange={(e)=>{setemail(e.target.value)}} placeholder='enter your email'/>
           
        </div>

        <div>
            <label htmlFor="password" className='signup-label'> enter Passowrd</label>
            <input type="text" onChange={(e)=>{setpassword(e.target.value)}} placeholder='enter your password'/>
        </div>

        <div>
           <label htmlFor="image" className='signup-label'>post Image</label>
           <input type="file" onChange={(e)=>setimage(e.target.files[0])}/>
           <button  onClick={handleImageUpload}>Upload</button>
        </div>
        <br />
        
        {error && (
            <div className='error-message'>
             <p>{error}</p>
            </div>
        )}
        
        <button className='signup-button' type='button ' onClick={handleAddUser}>Sign Up</button>

        <div className='signup-link'>
            <p>
               login to your account<a onClick={()=>{navigate("/login")}}>Login</a>
            </p>
        </div>
    </div>
  )
}
