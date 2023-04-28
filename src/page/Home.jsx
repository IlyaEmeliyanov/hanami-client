// Importing libraries
import React, { useState, Components, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";

// Importing components
import Spacer from "../components/common/Spacer";
import MenuCard from "../components/MenuCard";

// Importing images
import LogoWhite from "../images/logo-white.svg";

// Importing icons
import ShoppingCartIcon from "../images/icons/shopping-cart.svg";
import SearchIcon from "../images/icons/search.svg";


const Home = () => {

  const location = useLocation();
  const shopping = location.state;
  const sections = ["degustazione", "nigiri", "zuppe", "insalate", "gyoza", "primi", "riso", "teppanyaki", "frittura", "tartare e sashimi", "temaki", "sushi gio", "gunkan", "onigiri"
  ,"hosomaki", "tataki", "uramaki" , "hanami special roll", "futomaki", "maki fritto", "bowl", "sushi misto", "cena"];

  const [shoppingState, setShoppingState] = useState(shopping??[]);
  const [curSection, setSection] = useState(sections[0]);
  const [menu, setMenu] = useState ([]);
  const [filteredMenu, setFilteredMenu] = useState ([]);
  const [menuLoaded, setMenuLoaded] = useState (false);
  let mappedMenu;
  
  useEffect (() => {

    (async () => {
      let dishData;
      try{
        const response = await fetch('http://localhost:5500/menu');
        dishData = await response.json();
      } catch (error) {
        dishData = [];
      }
      setMenu(dishData);

    })();
  },[]);

  useEffect(()=>{
    if (menu.length >0){
      setMenuLoaded(true);
    }
  },  [menu])

  useEffect(()=>{
    if (menuLoaded){
      const filteredDishes = menu.find(item => item[curSection] !== undefined)[curSection];
      if (shopping && (shopping).length != 0){
        const mappedMenu = filteredDishes.map(dish =>{
          const matchingDish = shopping.find(dish2 => dish2._id === dish._id.$oid || dish2._id.$oid === dish._id.$oid || dish2._id.$oid === dish._id);
          if (matchingDish){
            return {...dish, quantity: matchingDish.qty};
          }
          return dish;
        });
        setFilteredMenu(mappedMenu);
      }
      else{
        setFilteredMenu(filteredDishes);
      }

    }

  }, [menuLoaded,menu]);

  useEffect (() =>{
    if(menuLoaded){
      const filteredDishes = menu.find(item => item[curSection] !== undefined)[curSection];
        if (shopping && (shopping).length != 0){
          const mappedMenu = filteredDishes.map(dish =>{
            const matchingDish = shopping.find(dish2 => dish2._id === dish._id.$oid || dish2._id.$oid === dish._id.$oid || dish2._id.$oid === dish._id);
            if (matchingDish){
              return {...dish, quantity: matchingDish.qty};
            }
            return dish;
          });
          setFilteredMenu(mappedMenu);
          
        }
        else{
          setFilteredMenu(filteredDishes);
        }
    }
  }, [curSection]);
    

  //shopping cart state
  function addDish(id, qty, price, dish, title, flag) {
    let item ={
      "_id": id,
        "qty": qty,
        "price": price,
        "dish": dish,
        "title": title
    }
    if ( flag === 0 ){
      setShoppingState([...shoppingState, item]);
    }  else if( flag === 1 ){
      const newObj = shoppingState.map(ogg =>{
        if (ogg._id === item._id|| ogg._id.$oid === item._id.$oid || ogg._id.$oid === item._id){
          return item;
        }
        return ogg;

      })
      setShoppingState(newObj);
    }  else if(flag === -1){

      const newObj = shoppingState.map(ogg =>{
        if (ogg._id === item._id || ogg._id){
          return item;
        }
        return ogg;
      })
      setShoppingState(newObj);

    } else {  
      const updatedItems = shoppingState.filter(item => item._id !== id);
      setShoppingState(updatedItems)
    }
  }

  //calcolo del totale dei piatti e numero
  const total = shoppingState.reduce((acc, item)=> acc + item.price, 0);
  const plates = shoppingState.reduce((acc, item)=> acc + item.qty, 0);
  
  
  const getLabel = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const MINUTES = 15;

  let [seconds, setSeconds] = useState(MINUTES * 60);
  const [timeLabel, setLabel] = useState(`${MINUTES}:00`);

  setInterval(() => {
    if (seconds > 0) {
      seconds--;
      setSeconds(seconds);
      setLabel(getLabel(seconds));
    } else {
      setLabel("00:00");
    }
  }, 1000);

  return (
    <section>
      <header className="header">
        <ul className="flex justify-between items-center">
          <li>
            <img src={LogoWhite} alt="logo-white" />
          </li>
          <li>
            <p className="text-fontPrimary font-semibold">{timeLabel}</p>
          </li>
          <li className="flex justify-center items-center gap-2">
            <img src={ShoppingCartIcon} alt="shopping-cart-icon" />
            <img src={SearchIcon} alt="search-icon" />
          </li>
        </ul>
      </header>

      <Spacer height="2rem" />

      <div className="">
        <ul className="flex overflow-x-scroll p-4">
            {sections.map(section => 
                <li key={section} onClick={() => setSection(section)} className="px-[0.7rem] py-[10px]">
                    <p className={`font-semibold text-${section === curSection ? "active" : "fontSecondary"}`}>{section.toUpperCase()}</p>
                </li>
            )}
        </ul>
      </div>
        
        <ul className="overflow-y-scroll z-0">
           
            {filteredMenu && filteredMenu.map((dish, index) =>
              <li key ={index}>
                <MenuCard dishData={dish} addDish={addDish}/>
              </li>
              )
            } 
          
        </ul>
      <Link to= "/shopping-cart" state= {shoppingState}>
        <button className="fixed w-full h-[5rem] left-[50%] bottom-0 -translate-x-[50%] px-auto py-[0.5rem] text-[#000] uppercase font-medium rounded-full gradient z-10">
          <span className="text-[#000]">€ ({plates}/5 piatti)</span>
          <p className="text-[#000] uppercase font-semibold">procedi all'ordine</p>
        </button>
      </Link>
    </section>
  );
};

export default Home;
