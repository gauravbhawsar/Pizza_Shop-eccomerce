import React from "react";
import NavBar from "./NavBar";
import {Table} from "react-bootstrap"
import {useState, useEffect} from "react"
const Orders = () => {
    const[orders,setOrders]=useState([]);
    let totalPrice=0;
    let prices=[];
    useEffect(() => {
       let user=JSON.parse(localStorage.getItem('user'));
       
       
      prices.push(user.order.map((pro, i) => {
          
            pro.map(p=>{
            totalPrice+=p.price;
            })
            return totalPrice;
       }));
       let order=user.order;
       setOrders(order);
      
    }, [])

  return (
    <div>
      <NavBar />
      <div>
        <h3>Orders</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SN</th>
              
              <th>Products</th>
              
              {/* <th>Total Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((pro, i) => (
              <tr>
                <td>{i+1}</td>
                {pro.map(p=>
                    <>
                
                <td>{p.name}</td>
                
                
                </>
                )}
                
               
              </tr>
            ))}
           
           
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
