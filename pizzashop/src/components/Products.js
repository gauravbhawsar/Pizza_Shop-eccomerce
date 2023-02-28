import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./NavBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  let cart=JSON.parse(localStorage.getItem('cart'));
  const addToCart=(pro)=>{
    if(cart){
    cart.push(pro);
    localStorage.setItem('cart',JSON.stringify(cart))
  }
  else{
    let carts=[];
    carts.push(pro);
    localStorage.setItem('cart',JSON.stringify(carts))
  }
}
  useEffect(() => {
    axios
      .get("http://localhost:8877/products")

      .then((res) => {
        setProducts(res.data.products);
     
      });
  }, []);

  return (
    <div>
    <NavBar/>
    <h3 className="text-center m-3" >Delicious Pizzas</h3>
      <div className="row d-flex justify-content-around">
        
        {products.map((pro, i) => (
          <div key={i} className="card col-lg-3 m-2 col-md-3 ">
            <img
              className="mx-auto mt-2"
              height="250px"
              width="320px"
              src={pro.path}
              alt="product"
            />
            <div className="card-body">
              <h3 className="card-title ">{pro.name}</h3>
              <p className="card-text"> Price: {pro.price}</p>
              <button
                className="btn btn-success"
                onClick={() => addToCart(pro)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
