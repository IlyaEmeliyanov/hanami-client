
// Importing libraries
import {useState} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

// Importing pages
import Login from './page/Login';
import Instructions from './page/Instructions';
import Home from './page/Home';
import ShoppingCart from './page/ShoppingCart';

// Importing context
import { ShoppingContext } from './context/ShoppingContext';

function App() {
  const [shoppingState, setShoppingState] = useState([]);

  return (
    <ShoppingContext.Provider value={[shoppingState, setShoppingState]}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/instructions" element={<Instructions/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
      </Routes>
    </BrowserRouter>
    </ShoppingContext.Provider>
  );
}

export default App;
