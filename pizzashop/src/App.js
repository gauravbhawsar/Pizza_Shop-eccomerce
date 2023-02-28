
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Registration from './components/Registration';
import Login from "./components/Login"
import Products from "./components/Products"
import Orders from "./components/Orders"
import Carts from "./components/Carts"
import CheckOut from "./components/CheckOut"
function App() {
  return (
    <Router>
     <Routes>
       <Route exact path="/registration" element={<Registration/>}></Route>
       <Route exact path="/" element={<Login/>}></Route>
       <Route exact path="/products" element={<Products/>}></Route>
       <Route exact path="/orders"element={<Orders/>}></Route>
       <Route exact path="/carts"element={<Carts/>}></Route>
       <Route exact path="/checkOut"element={<CheckOut/>}></Route>
     </Routes>
     </Router>
    
  );
}

export default App;
