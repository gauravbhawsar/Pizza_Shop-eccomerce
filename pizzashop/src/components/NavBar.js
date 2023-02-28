import React from "react";
import { Nav, Navbar, Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios"
export default function NavBar() {
  const navigate=useNavigate();
  const setData=async ()=>{
    let carts=JSON.parse(localStorage.getItem('cart'));
    let user=JSON.parse(localStorage.getItem('user'));
    console.log(carts);
    if(carts){
     user.cart=carts;
      await axios.put("http://localhost:8877/updateCart",user)
      .then((res) => {console.log(res.data);});
      localStorage.removeItem('cart');
      localStorage.removeItem('user');
      navigate('/');
    }
    else{
     
      navigate('/')
    }
  }
  return (
    <div>
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>THE PIZZASHOP</Navbar.Brand>
            <Nav className="me-auto">
            <Link style={{ textDecoration: "none", color: "white", "marginTop":"6px" }}to="/products" >PRODUCTS</Link>
            <Link style={{ textDecoration: "none", color: "white","marginLeft":"40px", "marginTop":"6px" }}to="/carts" >CART</Link>
              <Link style={{ textDecoration: "none", color: "white","marginLeft":"40px", "marginTop":"6px" }}to="/orders" >ORDERS</Link>
             
              <Button style={{ textDecoration: "none", color: "white", "marginLeft":"40px" }} onClick={()=>setData()} >LOGOUT</Button>
           
            </Nav>
          </Container>
        </Navbar>
      </>
    </div>
  );
}
