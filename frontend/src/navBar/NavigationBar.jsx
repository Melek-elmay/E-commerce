import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Navigation.css'

export default function NavigationBar() {
  const [searchedItem, setsearchedItem] = useState({});
  const [selectedProd, setselectedProd] = useState({}); ////////// I'm going to send this "selectedProd" to my home page to place instead of  "displayedProducts"

  const navigate = useNavigate();
  const getOneProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:3000/prod/prodName/${searchedItem}`);
      setselectedProd(result.data);
      navigate("/", { state:  selectedProd});
      console.log("this is sunglass: ", result.data);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(()=>{
  getOneProduct()
},[])



  return (
    <div className="nav-bar-div">
      <div className="logo-navbar">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5150/5150834.png"
          alt="logo-image"
          style={{ width: "20px" }}
        />
      </div>
      <div className="nav-bar-search">
        <input
          type="text"
          onChange={(e) => {
            setsearchedItem(e.target.value);
          }}
          className="search-input"
        />
        <button
          onClick={() => {
            getOneProduct()
          }}
          className="button-click-search"
        >
          search
        </button>
      </div>
      <div className="div-navigate-to-main">
        <button
          onClick={() => {
            navigate("/");
          }} 
        >
          home
        </button>
      </div>

      <div className="div-navigate-to-profile">
        <button
          onClick={() => {
            navigate("/profile");
          }}
        >
          Profile
        </button>
      </div>

      <div className="div-navigate-to-profile">
        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          cart
        </button>
        
      </div>

      <div className="div-navigate-to-profile">
        <button
          onClick={() => {
            navigate("/admin");
          }}
        >
          admin
        </button>
        
      </div>
    </div>
  );
}
