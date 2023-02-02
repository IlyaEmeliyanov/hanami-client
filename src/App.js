
// Importing libraries
import {Routes, Route, BrowserRouter} from 'react-router-dom'

// Importing pages
import Login from './page/Login';
import Home from './page/Home';
import ShoppingCart from './page/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/shopping-cart" element={<ShoppingCart/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
