import React, {useState} from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';

export default function Cart() {

  const navigate = useNavigate()
   
  const [priceone, setpriceone] = useState(15);
  const [priceTwo, setpriceTwo] = useState(50);
  const [priceThree, setpriceThree] = useState(80);
  
const [result, setresult] = useState(0);
const somePrice = ()=> {
   var res = priceone + priceTwo + priceThree
   setresult(res)
}


  return (
    <div className='all-carts-div'>
        <h1>carts</h1>
        <div>
          <div className='one-cart'>
            <h1>cart number 1</h1>
            <div className='one-product-to-buy'>
               <h2>product name </h2>
               <img src="https://m.media-amazon.com/images/I/71XcWqobDVL._AC_SL1500_.jpg" alt="" />
               <h3>price: {priceone}</h3>
            </div>

            <div className='one-product-to-buy'>
               <h2>product name </h2>
               <img src="https://m.media-amazon.com/images/I/71S-pQNQyIL._SL1500_.jpg" alt="" />
               <h3>price {priceTwo}</h3>
            </div>

            <div className='one-product-to-buy'>
                <h2>product name </h2>
                <img src="https://m.media-amazon.com/images/I/71KFxjVTO4L.__AC_SX300_SY300_QL70_FMwebp_.jpg" alt="" />
                <h3>price {priceThree}</h3>
            </div>
            <button onClick={()=>{
                somePrice()
            }}>purchase</button>
          </div>

          <div>
           sum purchase:  {result}
          </div>
          <button onClick={()=>{
            navigate('/')
          }}>back to main..</button>
        </div>

    </div>
  )
}
