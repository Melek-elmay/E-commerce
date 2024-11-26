import React, {useState} from "react";
import AdminCreateProd from "./AdminCreateProd";
import AdminAllProd from "./AdminAllProd";
import "./Admino.css"
import { useNavigate } from "react-router-dom";

export default function Admino() {
  const [show, setshow] = useState(false);
  const [showww, setshowww] = useState(false);
  const naviagte = useNavigate()

  return (
    <div>
      
      <div className="go-to-allPro">
      

      {!show ? (
        <div>
          <button onClick={()=>{
            naviagte('/')
          }}>back to main</button>
        <button className="go-to-allPro-btn" onClick={()=>{
          setshow(!show)
        }}>Manage Products </button>
        </div>
        
      ) : (
        <div className="one-div-pro">
          <AdminAllProd />
          <button onClick={()=>{
            setshow(!show)
          }}>back to...</button>
        </div>
      )}

</div>

<div className="gp-to-create"> 
      {!showww ? (
        <div>
          <button onClick={()=>{
            naviagte('/')
          }}>back to main</button>
        <button className="go-to-allPro-btn" onClick={()=>{
          setshowww(!showww)
        }}> Create Product </button>
        </div>
      ) : (
        <div className="one-div-pro">
          <button onClick={()=>{
            setshowww(!showww)
          }}>back to...</button>
          <AdminCreateProd />
          <button onClick={()=>{
            setshowww(!showww)
          }}>back to...</button>
        </div>
      )}
   </div>
    </div>
  );
}
