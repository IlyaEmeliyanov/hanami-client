
// Importing libraries
import {useState} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

// Importing pages
import Login from './page/Login';
import Instructions from './page/Instructions';
import InstructionsIta from './page/InstructionsIta';
import Home from './page/Home';
import ShoppingCart from './page/ShoppingCart';

// Importing context
import { ShoppingContext } from './context/ShoppingContext';
function App() {
const [shoppingState, setShoppingState] = useState({data: [], totalPrice: 0, totalCount: 0, tableNumber: 0, tableCount:0});

  return (
    <ShoppingContext.Provider value={[shoppingState, setShoppingState]}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Instructions/>}/>
        <Route exact path ="/InstructionsIta" element={<InstructionsIta/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
      </Routes>
    </BrowserRouter>
    </ShoppingContext.Provider>
  );
}

export default App;
