import React from 'react'
import axios from 'axios'

export default function AdminAllProd() {
    const [allProducts, setallProducts] = useState([]);
    const [stock, setstock] = useState();
    


    const changeProductStock = function() {
        
    }


    const deleteProduct =  function() {
      
    }


  return (
    <div>
        {allProducts.map(elem=>{
            <div>
                <h2>product name: {elem.productName}</h2>
                <input type="text" onChange={(e)=>{
                   setstock(e.target.value)
                }}/>
                <button onClick={changeProductStock}>change stock</button>
                <button onClick={()=>{
                   deleteProduct()
                }}>delete product</button>
            </div>
        })}
    </div>
  )
}
