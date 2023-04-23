// Importing libraries
import React, { useState, Components, useEffect } from "react";

// Importing components
import Spacer from "../components/common/Spacer";
import MenuCard from "../components/MenuCard";
// Importing images
import LogoWhite from "../images/logo-white.svg";

// Importing icons
import ShoppingCartIcon from "../images/icons/shopping-cart.svg";
import SearchIcon from "../images/icons/search.svg";

const Home = () => {
  const [dishes, setDishes] = useState ([]);
  const [nigiri, setNigiri] = useState ([]);
  const [degustazione, setDegustazione] = useState ([]);
  useEffect (() => {
    return (async () => {
      let dishData;
      try{
        const response = await fetch('http://localhost:5500/');
        dishData = await response.json();
      } catch (error) {
        dishData = [];
      }

      setDishes(dishData);
      const nigiri = dishData.filter(nigiri =>nigiri.dish>76 && nigiri.dish < 88);
      setNigiri(nigiri);
      const degustazione = dishData.filter(degustazione => degustazione.dish<5);
      setDegustazione (degustazione);
    });
  }, []);

  //shopping cart state
  const [shoppingState, setShoppingState] = useState([]);
  function addDish(id, qty, price, dish, flag) {
    if ( flag === 0 ){
      const item = {
        "_id": id,
        "qty": qty,
        "price": price,
        "dish": dish
      }
      setShoppingState([...shoppingState, item]);
    }
    else if( flag === 1 ){
      const item ={
        "_id": id,
        "qty": qty,
        "price": price *(qty),
        "dish": dish
      }
      const newObj = shoppingState.map(ogg =>{
        if (ogg._id === item._id){
          return item;
        }
        return ogg;
      })
      setShoppingState(newObj);
    }
    else if(flag === -1){
      const item = {
        "_id": id,
        "qty": qty,
        "price": price *(qty),
        "dish": dish
      }
      const newObj = shoppingState.map(ogg =>{
        if (ogg._id === item._id){
          return item;
        }
        return ogg;
      })
      setShoppingState(newObj);
    }

    else {
      const updatedItems = shoppingState.filter(item => item._id !== id);
      setShoppingState(updatedItems)
    }
  }

  const total =shoppingState.reduce((acc, item)=> acc + item.price, 0);
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

  const sections = ["degustazione", "nigiri", "zuppe", "insalate", "gyoza", "primi", "riso", "teppanyaki", "frittura", "tartare & sashimi", "temaki", "gio", "gunkan", "onigiri"
  ,"hosomaki", "tataki", "uramaki" , "special roll", "futomaki", "maki fritto", "bowl", "sushi misto", "cena"];

  const [curSection, setSection] = useState(sections[0]);
  let selected = [];
  //oppure faccio uno switch case 
  if (curSection === "nigiri") {
    selected = nigiri;
  } else if (curSection === "degustazione") {
    selected = degustazione;
  }/* else if (curSection === "antipasti") {
    selected = antipasti;
  } else if (curSection === "zuppe") {
    selected = zuppe;
  } else if (curSection === "insalate") {
    selected = insalate;
  } else if (curSection === "gyoza") {
    selected = gyoza;
  } else if (curSection === "primi") {
    selected = primi;
  } else if (curSection === "riso") {
    selected = riso;
  } else if (curSection === "teppanyaki") {
    selected = teppanyaki;
  } else if (curSection === "frittura") {
    selected = degustazione;
  } else if (curSection === "tartare & sashimi") {
    selected = tartare;
  } else if (curSection === "temaki") {
    selected = temaki;
  } else if (curSection === "gio") {
    selected = gio;
  } else if (curSection === "gunkan") {
    selected = gunkan;
  } else if (curSection === "onigiri") {
    selected = onigiri;
  } else if (curSection === "hosomaki") {
    selected = hosomaki;
  } else if (curSection === "tataki") {
    selected = tataki;
  } else if (curSection === "uramaki") {
    selected = uramaki;
  } else if (curSection === "special roll") {
    selected = special;
  } else if (curSection === "futomaki") {
    selected = futomaki;
  } else if (curSection === "maki fritto") {
    selected = maki;
  } else if (curSection === "bowl") {
    selected = bowl;
  } else if (curSection === "sushi misto") {
    selected = misto;
  } else if (curSection === "cena") {
    selected = cena;
  }*/

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
                <li key={section} onClick={() => setSection(section)} className="px-[1.5rem] py-[10px]">
                    <p className={`font-semibold text-${section === curSection ? "active" : "fontSecondary"}`}>{section.toUpperCase()}</p>
                </li>
            )}
        </ul>
      </div>

      <Spacer height="2rem"/>
        
        <ul className="overflow-y-scroll z-0">
           
            {selected && selected.map((dish, index) =>
              <li key ={index}>
                <MenuCard dishData={dish} addDish={addDish}/>
              </li>
              )
            } 
          
        </ul>

      <button className="fixed w-full h-[5rem] left-[50%] bottom-0 -translate-x-[50%] px-auto py-[0.5rem] text-[#000] uppercase font-medium rounded-full gradient z-10" onClick={()=>{ console.log(shoppingState)}}>
        <span className="text-[#000]">€ {total} ({plates}/5 piatti)</span>
        <p className="text-[#000] uppercase font-semibold">procedi all'ordine</p>
      </button>
    </section>
  );
};

export default Home;
