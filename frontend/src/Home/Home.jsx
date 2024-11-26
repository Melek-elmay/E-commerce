import React , {useEffect, useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavigationBar from '../navBar/NavigationBar'
import './Home.css'

export default function Home() {
  const [status, setstatus] = useState([]);
const [productid , setproductid] = useState(0)
  const location = useLocation();
  const receivedData = location.state;

  console.log("received Data :", receivedData)

  const [show, setshow] = useState(false);
  const [showTwo, setshowTwo] = useState(false);

  const [allProduct, setallProduct] = useState([]);


const iduser = JSON.parse(localStorage.getItem("user")).id
console.log(iduser);

  const [displayedProducts, setdisplayedProducts] = useState(allProduct);

  const getAllProducts = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/prod/allproduct`);
      
      console.log("all products: ", result.data);
      setallProduct(result.data);
      setdisplayedProducts(result.data)
    } catch (err) {
      console.log(err);
    }
  };


 

  const changeView = function () {
    setshow(!show);
  };
  const changeViewTwo = function () {
    setshowTwo(!showTwo);
  };


  /////// This one will get all the products that have a certain price condition //////

  ////////////////// Price /////////////////////////

  const allProductsByPrice = function (somth) {
    const result = displayedProducts.filter((elem) => {
      elem.price <= somth;
    });
    setdisplayedProducts(result);
  };


  const fetchingByPrice = function(somth) {
    var jojo = somth
    allProductsByPrice(jojo) 
  }


  useEffect(()=>{
    getAllProducts()
  },[show, showTwo])
 ////////////////// Price /////////////////////////


 const postInCartProduct = function() {
    
    axios.post(`http://localhost:3000/cart/productInCart` ,{
        ProductId:productid,
        quantity : 1 ,
        userid : iduser
      })
      .then(()=> {
      console.log("added to cart");
      
      })
      
    
    .catch((err) => {
      console.log(err)
    })
 }

 return (
  <div>
    <NavigationBar />
    <div className="side-bar-div">
      <div className="toggle-div">
        {!show ? (
          <button
            onClick={() => {
              changeView();
            }}
          >
            category
          </button>
        ) : (
          <div className="choose-div">
            <h2
              onClick={() => {
                // Add functionality here
              }}
            >
              IT
            </h2>
            <h2
              onClick={() => {
                // Add functionality here
              }}
            >
              Camera
            </h2>
            <button
              onClick={() => {
                changeView();
              }}
            >
              back to..
            </button>
          </div>
        )}
      </div>

      <div className="toggle-div">
        {!showTwo ? (
          <button
            onClick={() => {
              changeViewTwo();
              getAllProducts();
            }}
          >
            elem price
          </button>
        ) : (
          <div className="choose-div">
            <h2 onClick={() => fetchingByPrice(10)}>lower than 10$</h2>
            <h2 onClick={() => fetchingByPrice(100)}>lower than 100$</h2>
            <h2 onClick={() => fetchingByPrice(200)}>lower than 200$</h2>
            <h2 onClick={() => fetchingByPrice(200)}>higher than 200$</h2>
            <button
              onClick={() => {
                changeViewTwo();
              }}
            >
              back to...
            </button>
          </div>
        )}
      </div>
    </div>

    <div className="display-all-Products">
      {displayedProducts.map((elem) => (
        <div className="one-small-prod-div" key={elem.id}>
          <img src={elem.image} alt="product-image" style={{ width: '100px' }} />
          <h2>name: {elem.productName}</h2>
          <h2>price: {elem.price} $</h2>
          <button
            onClick={() => {
              setproductid(elem.id)
              postInCartProduct()
            }}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  </div>
);
}