import React from 'react'

export default function AdminCreateProd() {
    const [productName, setproductName] = useState("");
    const [price, setprice] = useState(0);
    const [description, setdescription] = useState("");
    const [stock, setstock] = useState(0);


  return (
    <div>
      <div>
        <h1>create product</h1>
        <h3>Product Name</h3>
        <input type="text" onChange={(e)=>{
            setproductName(e.target.value)
        }}/>
        <h3>Product price</h3>
        <input type="text" onChange={(e)=>{
            setprice(e.target.value)
        }} />
        <h3>Product description</h3>
        <input type="text" onChange={(e)=>{
            setdescription(e.target.value)
        }}/>
        <input type="text" onChange={(e)=>{
            setstock(e.target.value)
        }}/>
      </div>
      
    </div>
  )
}
