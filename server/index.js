const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Product = require("./models/product.model");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: "gauravbhawsar98@gmail.com",
    pass: "Gaurav@1998",
  },
});
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/PizzaShop");
app.post("/register", async (req, res) => {
  console.log(req.body);
  let ins = new User({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    cart: req.body.cart,
    order: req.body.order,
  });
  ins.save((err) => {
    console.log(err);
    if (err) {
      res.send("user exist with same email id");
    } else {
      res.send("data added");
    }
  });
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  User.findOne(
    { email: req.body.email, password: req.body.password },
    (err, data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send(data);
      }
    }
  );
});
app.get("/products", async (req, res) => {
  const products = await Product.find();

  if (products) {
    res.send({ products });
  } else {
    res.json({ status: "not found" });
  }
});
app.put("/addOrders", async (req, res) => {
  console.log(req.body);
  await User.updateOne(
    { email: req.body.email },
    {
      $set: { order: req.body.order, cart: req.body.cart },
    },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        transporter.sendMail(
          {
            from: "gauravbhawsar98@gmail.com",
            to: req.body.email,
            subject: "order Confirmation",
            text: "your order is placed",
            html: `<h1>Order Sumary</h1>
                    <table>
                    <tr>
                        <th>Order NO</th>
                        <th>Product Name</th>
                        <th>Price</th>
                    </tr>
                   ${req.body.order.map((p) => {
                     `<tr>
                        <td>${p.id}</td>
                        <td>${p.name}</td>
                        <td>${p.price}</td>
                    </tr>`;
                   })}
                   
                    </table>`,
          },
          (error, res) => {
            if (error) {
              console.log(error);
            } else {
              console.log("mail sent", res);
            }
          }
        );
        res.send("updated succesfully");
      }
    }
  );
});
app.put("/updateCart", async (req, res) => {
  console.log(req.body);
  await User.updateOne(
    { email: req.body.email },
    {
      $set: { cart: req.body.cart },
    },
    (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("updated succesfully");
      }
    }
  );
});
app.listen(8877, () => {
  console.log("running on port 8877");
});
