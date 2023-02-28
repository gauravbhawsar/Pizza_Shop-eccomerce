import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/button";
const regForName = RegExp("[a-zA-Z][a-zA-Z ]*");
const regForEmail = RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const regForNumber = RegExp("^[6-9][0-9]{9}$");
const regForpassword = RegExp(
  "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})"
);
export default function Registration() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    name: null,
    contact: null,
    email: null,
    password: null,
    conpassword: null,
    errors: {
      name: "",
      contact: "",
      email: "",
      password: "",
      conpassword: "",
    },
  });

  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });

    let errors = state.errors;

    switch (name) {
      case "name":
        errors.name = regForName.test(value)
          ? ""
          : "Invalid Name, Use Character Only";
        setState({ ...state, name: value });
        break;

      case "contact":
        errors.contact = regForNumber.test(value)
          ? ""
          : "Invalid Contact Number, Write 10 digit contact number";
        setState({ ...state, contact: value });
        break;

      case "email":
        errors.email = regForEmail.test(value) ? "" : "Invalid Email-Id";
        setState({ ...state, email: value });
        break;
      case "password":
        errors.password = regForpassword.test(value) ? "Invalid Email-Id" : "";
        setState({ ...state, password: value });
        break;
      case "conpassword":
        errors.conpassword =
          state.password === value ? "" : "password is not matched";
        break;
      default:
        return alert("form validated");
    }
    setState({ ...state, [name]: value });
  };
  const formSubmit = async (event) => {
    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
      contact: state.contact,
      cart:[],
      order:[]
    };
    if (validate(state.errors)) {
    
       await axios.post("http://localhost:8877/register", formData)

        .then((res) => res.data);
        navigate('/');
    } else {
      alert("Invalid form");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const { errors } = state;
  return (
    <div className="container mt-5" style={{ border: "black solid 2px" }}>
      <h2 className="mt-3">Register Here</h2>
      <form className="m-5">
        <div className="form-group">
          <label>
            <b> Name</b>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your  name"
            className="form-control"
            onBlur={(e) => handler(e)}
          />
          {errors.name.length > 0 && (
            <span style={{ color: "red" }}>{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            <b>Contact Number</b>
          </label>
          <input
            type="text"
            name="contact"
            placeholder="Enter your 10 digit contact number"
            className="form-control"
            onBlur={(e) => handler(e)}
          />
          {errors.contact.length > 0 && (
            <span style={{ color: "red" }}>{errors.contact}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            <b>Email-id</b>
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email-id"
            className="form-control"
            onBlur={(e) => handler(e)}
          />
          {errors.email.length > 0 && (
            <span style={{ color: "red" }}>{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            <b>Password</b>
          </label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            className="form-control"
            onBlur={(e) => handler(e)}
          />
          {errors.password.length > 0 && (
            <span style={{ color: "red" }}>{errors.password}</span>
          )}
        </div>
        <div className="form-group">
          <label>
            <b>Confirm Password</b>
          </label>
          <input
            type="text"
            name="conpassword"
            placeholder="Confirm password"
            className="form-control"
            onBlur={(e) => handler(e)}
          />
          {errors.conpassword.length > 0 && (
            <span style={{ color: "red" }}>{errors.conpassword}</span>
          )}
        </div>

        <Button onClick={() => formSubmit()} className="btn btn-primary">
          Register
        </Button>
      </form>
      <Button style={{ width: "25%" }} onClick={() => navigate(`/`)}>
        Login
      </Button>
    </div>
  );
}
