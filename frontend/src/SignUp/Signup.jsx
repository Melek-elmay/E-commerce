import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [imageUrl, setimageUrl] = useState();
    const [image, setimage] = useState();
    const [error, seterror] = useState();


const navigate= useNavigate()


const validatePassword=(password)=> {
    const errors =[]
    const passwordChecking=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if(password.lenght < 8) {
       errors.push("password must contain at least 8 letters")
    } 
    if(!passwordChecking.test(password)) {
        errors.push("password must contain at least one upper case, one lower case, and one symbol")
    }

    return {
        isValid: errors.length === 0, 
        errors: errors
    }
}

const handleImageUpload = async (e) => {
    e.preventDefault(); 
    const data = new FormData()
    data.append('file', image); 
    data.append('upload_reset', 'ecommerce'); 
    data.append('cloud_name','dpqkzgd5z' )
    console.log(image)

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dpqkzgd5z/image/upload",data)
      setimageUrl(response.data.secure_url)
      console.log(response.data)
    } catch (error) {
      console.log("Error uploading image to cloudinary", error)
    }
 }; 

 const handleAddUser = async () => {
    try {
        const passswordValidation = validatePassword(password); 
        if(!passswordValidation.isValid) {
            seterror("password is too weak")
            passswordValidation.errors.forEach((err)=>seterror((element)=> element + "  " + err  ))
            return; 
        }

        const response = await axios.post("http://localhost:3000/user/signup", {
            name, 
            email, 
            password, 
            image: imageUrl,
        }, {headers: {'content-Type': "application/json"}}); 

       console.log(response.data)
       seterror('')
       navigate("/login");
    }


    catch(err) {
      if(error.response.data === "User already exists"){
         seterror("email address is already registered. Please use a diffferent email")
      } else {
        console.log(error)
        seterror("an error occurred during signup, Please try again later")
      }
    }
 } 



  return (
    <div>
        <h2>sign up</h2>
        <div>
            <label htmlFor="fullName"></label>
            <input type="text" value={name} onChange={(e)=>{setname(e.target.value)} }  placeholder= "enter your full name"/>
        </div>

        <div>
            <label htmlFor="email">
                <input type="text" value={email} onChange={(e)=>{setemail(e.target.value)}} placeholder='enter your email'/>
            </label>
        </div>

        <div>
            <label htmlFor="password">
                <input type="text" value={password} onChange={(e)=>{setpassword(e.target.value)}} placeholder='enter your password'/>
            </label>
        </div>

        <div>
           <label htmlFor="image"></label>
           <input type="file" value={imageUrl} onChange={(e)=>setimage(e.target.files[0])}/>
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
