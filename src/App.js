import React from "react";
// Importing libraries
import {Routes, Route, BrowserRouter} from 'react-router-dom'

// Importing pages
import Login from './page/Login';
import Instructions from './page/Instructions';
import Home from './page/Home';
import ShoppingCart from './page/ShoppingCart';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/" element={<Instructions/>}/>
        <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
