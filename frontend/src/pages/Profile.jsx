import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const [productName, setproductName] = useState("");
  const [price, setprice] = useState("");
  const [image, setimage] = useState("");
  const [stock, setstock] = useState("");
  const [newdata, setnewdata] = useState([]);

  const navigate = useNavigate();

  const [userid, setuserid] = useState("");
  const [userData, setuserData] = useState({});
  const [gogo, setgogo] = useState(false);

  const [view, setview] = useState(false);

  const imageData = JSON.parse(localStorage.getItem("user")).image
  const username = JSON.parse(localStorage.getItem("user")).userName

  /////////posting a product in the home for sale /////
  const postProduct = async function () {
    let x =  {productName,
    price,
    image,
    stock}
    let y = JSON.stringify(x)
    localStorage.setItem("data" , y)
    setnewdata([...newdata , JSON.parse(y)])
    try {
      const result = await axios.post(
        `http://localhost:3000/prod/postProduct`,
   JSON.parse(localStorage.getItem("data"))
      );
      console.log("posting from profile", result.data);
    
  
      setgogo(!gogo);
    } catch (err) {
      console.log(err);
    }
  };

  const showCreate = () => {
    setview(!view);
  };

  return (
    <div className="profile-comp-div">
      <div className="blue-bar-div">
        <img
          src={imageData}
          alt=""
          className="profile-pic-rounded-in-center"
        />
        <h2 className="profile-h2">name: {username}</h2>
      </div>
     

      <button
        onClick={() => {
          showCreate();
        }}
        className="toggle-create"
      >
        create post{" "}
      </button>

      {!view ? (
        <div className="post-product-profile">
          <h1 className="post-product-profile-h1">create product</h1>
          <h3 className="post-product-profile-h3">Product Name</h3>
          <input
            type="text"
            onChange={(e) => {
              setproductName(e.target.value);
            }}
          />
          <h3>Product price</h3>
          <input
            type="text"
            onChange={(e) => {
              setprice(e.target.value);
            }}
          />
          <h3>Product image</h3>
          <input
            type="text"
            onChange={(e) => {
              setimage(e.target.value);
            }}
          />
          <h3>Product stock</h3>
          <input
            type="text"
            onChange={(e) => {
              setstock(e.target.value);
            }}
          />
          <button
            onClick={() => {
              postProduct();
      
            }}
          >
            Post product
          </button>
        </div>
      ) : (
        <h1></h1>
      )}
{console.log(newdata , "newdata")
}
      <div className="mapping-all-prod-div">
        {(newdata.length ? newdata : []).map((elem) => (
          <div className="All-products-displayes">
            <img src={elem.image} alt="" />
            <h2>{elem.productName}</h2>
            <h2>{elem.description}</h2>
            <h2>{elem.stock}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
