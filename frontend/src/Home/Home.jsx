import React , {useState} from "react";
import axios from "axios";

export default function Home() {
  const [status, setstatus] = useState([]);

  const [price, setprice] = useState(false);
  const [collections, setcollections] = useState(false);
  const [chains, setchains] = useState(false);
  const [categories, setcategories] = useState(false);
  const [onSale, setonSale] = useState(false);

  const [allProduct, setallProduct] = useState([]);

  const [allStatus, setallStatus] = useState([]);

  const getAllProducts = async function () {
    try {
      const result = await axios.get("localhos://3000");
      setallProduct(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  ///////// first ///////////////////////////////////////// !!!! need to test
  const getAllStatus = function () {
    var newArr = [];

    for (let i = 0; i < allProduct.length; i++) {
      for (let j = 0; j < newArr.length; j++) {
        if (newArr[j] !== allProduct[i].status) {
          newArr.push(allProduct[i].status);
        }
      }
    }
    setstatus(newArr);
  };

  const [show, setshow] = useState(false);

  const changeView = function () {
    setshow(!show);
  };

  

  // now use displayedProducts to send it as props to change the products that are displayed


  const [displayedProducts, setdisplayedProducts] = useState([]);

  const allProductsBystatus = function (somth) {
    const result = allProduct.filter((elem) => {
      elem.status === somth;
    });
    setdisplayedProducts(result);
  };




  /////// This one will get all the products that have a certain price condition //////


  ////////////////// Price /////////////////////////

  const allProductsByPrice = function (somth) {
    const result = allProduct.filter((elem) => {
      elem.price <= somth;
    });
    setdisplayedProducts(result);
  };

  const fetchingByPrice = function(somth) {
    var jojo = somth
    allProductsByPrice(jojo) 

  }

 ////////////////// Price /////////////////////////

  return (
    <div>
    <div>
      {!show ? (
        <button
          onClick={() => {
            changeView();
            getAllProducts();
            getAllStatus();
            setShow(true);
          }}
        >
          Status
        </button>
      ) : (
        status.map((elem) => (
          <h3 onClick={() => allProductsBystatus(elem)}>
            {elem}
          </h3>
        ))
      )}
    </div>

    <div>
      {!show ? (
        <button
          onClick={() => {
            changeView();
            getAllProducts();
            setShow(true);
          }}
        >elem
          price
        </button>
      ) : (
        <div>
       <h2 onClick={()=>{fetchingByPrice(someth = 50)}}>lower than 50$ </h2>
       <h2 onClick={()=>{fetchingByPrice(someth = 100)}}>lower than 100$ </h2>
       <h2 onClick={()=>{fetchingByPrice(someth = 200)}}>lower than 200$</h2>
       <h2 onClick={()=>{fetchingByPrice(someth = 200)}}>higher than 200$</h2>
       <button>back to..</button>
       </div>
      )}
    </div>

    <div className="display-all-Products">
       {displayedProducts.map((elem)=>{
        <div>
          <img src={elem.image} alt="product-image" />
          <h2>{elem.productName}</h2>
          <h2>{elem.price}</h2>
          <button onClick={()=>{
              
          }}>Buy Now</button>
        </div>
       })}
    </div>
     

    </div>
    
  );
}
