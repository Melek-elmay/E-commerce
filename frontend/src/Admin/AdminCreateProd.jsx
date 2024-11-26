import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminCreateProd.css';


export default function AdminCreateProd() {

    
    const [productName, setproductName] = useState("");
    const [price, setprice] = useState(0);
    const [image, setimage] = useState("");
    const [stock, setstock] = useState(0);

    const navigate = useNavigate()

    const postProduct = async function () {
      try {
          const response = await axios.post(`http://localhost:3000/prod/postProduct`, {
              productName, 
              price,
              image,
              stock,
          });
          console.log("Product posted successfully:", response.data);
      } catch (err) {
          console.error("Error posting product:", err);

      }
  };
  

   

  return (
    <div >
      <div className='create-product-div'>
        <h1>create product</h1>
        <h3>Product Name</h3>
        <input type="text" onChange={(e)=>{
            setproductName(e.target.value)
        }}/>
        <h3>Product price</h3>
        <input type="text" onChange={(e)=>{
            setprice(e.target.value)
        }} />
        <h3>Product image</h3>
        <input type="text" onChange={(e)=>{
            setimage(e.target.value)
        }}/>
        <h3>Product stock</h3>
        <input type="text" onChange={(e)=>{
            setstock(e.target.value)
        }}/>
        <h3>Product category</h3>
        <input type="text" onChange={(e)=>{
            setstock(e.target.value)
        }}/>
        
        <br />
        <button onClick={()=>{{
             postProduct()
        }}}>post product </button>
      </div>

      <div className='back-to-main-div'>
        <button className='special-back-to-main-btn' onClick={()=>{
          navigate('/')
        }}>back to home... </button>
      </div>
      
    </div>
  )
}

//////done normalment 