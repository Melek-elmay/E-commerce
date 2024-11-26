import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminAllProd.css'



export default function AdminAllProd() {
    const [allProducts, setallProducts] = useState([]);
    const [stock, setstock] = useState(0);
    const [gogg, setgogg] = useState(false);

    console.log("allProducts", allProducts)
    const navigate = useNavigate()
    

    const deleteProduct = async function (id) {
      try {
          const response = await axios.delete(`http://localhost:3000/prod/deleteProduct/${id}`);
          console.log("delete response here: ", response)
      } catch (err) {
          console.error("err deleting product", err);
  
  };
}
  

    const getAllProducts = async function() {
      try {
        const result = await axios.get(`http://localhost:3000/prod/AllProduct`)
        setallProducts(result.data)
      } catch(err) {
           console.log(err)
      }
  
    }

    /////// I can add Update the stock here if I have time

    useEffect(()=>{
      getAllProducts() 
    },[gogg])


    console.log('gogogooo', gogg)

  return (
    <div className='all-produc-in-Admin'>
    {allProducts.map((elem) => (
        <div className='maping-on-each'>
            <h2>Product Name: {elem.productName}</h2>
            {/* <input onChange={(e) => setstock(e.target.value)} /> */}
            {/* <button onClick={changeProductStock}>Change Stock</button> */}
            <button
                onClick={() => {
                    deleteProduct(elem.id);
                    setgogg(!gogo);
                }}
                className='btn-all-produc-in-Admin'
            >
                Delete Product
            </button>
        </div>
    ))}
    <div>
      <button onClick={()=>{
      navigate('/')
    }} className='btn-all-produc-in-Admin'>back to main</button>
     </div>
</div>

  )
}
