import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import { FloatingLabel, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/button";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const checkdata = async() => {
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    let user;
    await axios.post("http://localhost:8877/login", formData)
        
        .then((res) => {console.log(res.data);  user=res.data});
      if(user){
          localStorage.setItem('user',JSON.stringify(user))
          localStorage.setItem('cart',JSON.stringify(user.cart))
          navigate('/products');
      }
      else{
          alert("check email or password")
      }
  };

  return (
    <>
      <Container
        style={{
          width: "50%",
          marginTop: "10%",
          border: "1px solid grey",
          padding: "50px",
        }}
      >
        <h1
          style={{
            color: "black",
            marginBottom: "10px",
            fontFamily: "bolder",
            textAlign: "center",
          }}
        >
          Login Page
        </h1>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            id="email"
            ref={emailRef}
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Password"
          />
        </FloatingLabel>
        <Container style={{ textAlign: "center" }}>
          <Button
            className="mt-3"
            style={{ width: "50%" }}
            onClick={() => checkdata()}
          >
            Login
          </Button>
          <p className="mt-2">If not registerd click to Register</p>

          <Button
            style={{ width: "50%" }}
            onClick={() => navigate(`/registration`)}
          >
            Register
          </Button>
        </Container>
      </Container>
    </>
  );
}

export default Login;
