import React from 'react'
import { useEffect ,useState} from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {Button} from 'react-bootstrap';
import NavBar from "./NavBar"
const Carts = () => {
  const[products,setProducts]=useState([]);
  const[totalPrice,setTotalPrice]=useState(0);
  const navigate=useNavigate();
  let total=0;
    useEffect(()=>{

        let carts= JSON.parse(localStorage.getItem('cart'));
        if(carts!==null){
        carts.forEach(c => {
          total+=c.price
        });
        
        setProducts(carts);
        console.log(products);
        setTotalPrice(total);
      }else{
         let user= JSON.parse(localStorage.getItem('user'));
         user.cart.forEach(u=>{
          total+=u.price
           
         })
         setProducts(user.cart);
         setTotalPrice(total);
      }
      
       
      
    },[]);
  

    
    return (
        <div>
        <NavBar/>
        <h4>Cart</h4>
        
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SN</th>
              <th>Product Image</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {products && products.map((pro, i) => 
            <tr>
              <td>{i+1}</td>
              <td><img src={pro.path} height="100px" width="100px" /></td>
              <td>{pro.name}</td>
              <td style={{"color":"green"}}>${pro.price}</td>
              
              
            </tr>
          )}
          <tr>
          <td colSpan='3' className="text-right"><Button  onClick={()=>navigate('/checkOut',{state:{totalPrice,products}})}>Place Order</Button></td>
          <td >Total Price : ${totalPrice} </td>
          
          </tr>
          
          </tbody>
        </Table>
      
      
   
        </div>
    )
}

export default Carts
