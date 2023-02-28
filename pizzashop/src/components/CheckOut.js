import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useRef } from "react";
import { Button, Table } from "react-bootstrap";
import NavBar from "./NavBar";
import axios from "axios";
const CheckOut = () => {
  const cardRef = useRef("");
  const cvvRef = useRef("");
  const location = useLocation();
  const navigate = useNavigate();
  const validate = async () => {
    let orders = [];
    let userdata;

    if (
      cardRef.current.value.length == 16 &&
      cvvRef.current.value.length == 3
    ) {
      let user = JSON.parse(localStorage.getItem("user"));
      let data = {
        email: user.email,
        password: user.password,
      };

      await axios.post("http://localhost:8877/login", data).then((res) => {
        userdata = res.data;
        console.log(res.data);
      });
      console.log(userdata);
      location.state.products.forEach((ele) => {
        orders.push(ele);
      });

      userdata.order.push(orders);
      userdata.cart = [];
      localStorage.setItem("user", JSON.stringify(userdata));
      localStorage.removeItem("cart");

      await axios
        .put("http://localhost:8877/addOrders", userdata)
        .then((res) => {
          console.log(res.data);
        });

      navigate("/orders");
    } else {
      alert("Please check card No. or CVV");
    }
  };

  return (
    <div>
      <NavBar />
      <h3 className="text-center">CheckOut</h3>
      <div
        style={{ border: "black solid 2px", margin: "10px", padding: "10px" }}
      >
        <h4>Order Summary</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>SN</th>
              <th>Product Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {location.state.products.map((pro, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{pro.name}</td>
                <td style={{ color: "green" }}>${pro.price}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-right">
                Total Price :
                <span style={{ color: "green" }}>
                  ${location.state.totalPrice}{" "}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>

        <div
          style={{ border: "black solid 2px", margin: "10px", padding: "10px" }}
          className="text-center"
        >
          <div className="text-left">
            <span>Card No :</span>{" "}
            <input ref={cardRef} placeholder="16 digit card No."></input> <br />
            <br />
            <span>CVV :</span>{" "}
            <input ref={cvvRef} placeholder="3 digit CVV"></input>
            <br />
            <br />
            <Button onClick={() => validate()}>Pay Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
