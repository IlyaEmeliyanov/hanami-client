// Importing libraries
import React, { useContext, useEffect, useState, useCallback } from "react";
import {useLocation, useNavigate } from "react-router-dom";

// Importing context
import { ShoppingContext } from "../context/ShoppingContext";

// Importing components
import Spacer from "../components/common/Spacer";
import MenuCard from "../components/MenuCard";

// Importing images
import Logo from "../images/logo.svg";

// Importing icons
// import ShoppingCartIcon from "../images/icons/shopping-cart.svg";
// import SearchIcon from "../images/icons/search.svg";

const Home = () => {

  const baseUrl ="/photos/";

  const location = useLocation();

  const [shoppingState, setShoppingState] = useContext(ShoppingContext);
  const { data, totalPrice, totalCount, tableNumber, tableCount } = shoppingState;
  const [timer, setTimer] = useState(0)

  //recupero shoppingState dal localStorage
  useEffect(() => {
    const storedShoppingStateString = localStorage.getItem('shoppingState');
    if (storedShoppingStateString !== null){
      const storedShoppingState = JSON.parse(storedShoppingStateString);
      console.log("[LOG]1", storedShoppingState);
      setShoppingState((prevState) => ({
        ...prevState,
        ...storedShoppingState
      }));
    }
  }, []);


  const numeroTavolo = parseInt(localStorage.getItem("numeroTavolo"));
  useEffect(() => {
    setShoppingState(prevState => ({...prevState, tableNumber: numeroTavolo}));
  }, [numeroTavolo]);
  const categories = ["dishes", "wines", "drinks", "desserts"];

  const dishesSections = [
    "antipasti",
    "bowl",
    "degustazione",
    "frittura",
    "futomaki",
    "gunkan",
    "gyoza",
    "hanami special roll",
    "hosomaki",
    "insalate",
    "maki fritto",
    "menu cena",
    "nigiri",
    "onigiri",
    "primi",
    "riso",
    "sushi misto",
    "tartare e sashimi",
    "tataki",
    "temaki",
    "teppanyaki",
    "uramaki",
    "zuppe",
    "sushi gio",
  ];

  const winesSections = ["bianchi", "rossi", "bollicine", "rosati"];

  // States
  const [menu, setMenu] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [areCardsLoaded, setAreCardsLoaded] = useState(false);

  const [curCategory, setCategory] = useState("dishes");
  const [sections, setSections] = useState(dishesSections);
  const [curSection, setSection] = useState(sections[0]);
  const [filteredMenu, setFilteredMenu] = useState();
  const [curMenu, setCurMenu]= useState([]);
  const [tables, setTables] = useState()

  useEffect(() => {
    
    (async () => {
      let data;
      let allTables;
      try {
        const response = await fetch("http://localhost:5500/menu");
        const tableResponse = await fetch ("http://localhost:5500/tables");
        allTables = await tableResponse.json();
        data = await response.json();
        setTables(allTables);
        setFilteredMenu(data[curCategory][curSection]);
        setIsLoaded(true);

        
      } catch (error) {
        data = [];
      }
      setMenu(data);
    })();
    const fetchTimer = async () => {
      const body = {
        table: numeroTavolo
      }
      try {
        const response = await fetch("http://localhost:5500/timer", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ table: numeroTavolo })
        });
        const data = await response.json();
        const counter = data.counter;
        console.log("RICHIESTA: ", counter)
        setTimer(counter);
      } catch (error) {
        console.error('Errore nella richiesta del timer', error);
      }
    };
  
    const interval = setInterval(fetchTimer, 5000); // Effettua la richiesta ogni 5 secondi
  
    // Quando il componente si smonta, cancella l'intervallo
    return () => {
      clearInterval(interval);
    };
  }, []);

  const getLabel = (seconds) =>
  `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  let [seconds, setSeconds] = useState(0);
  const [timeLabel, setLabel] = useState(``);

  useEffect(() => {
    const countdown = () => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
        setLabel(getLabel(seconds - 1));
      } else {
        setLabel("00:00");
      }
    };
  
    if (seconds > 0) {
      const timeout = setTimeout(countdown, 1000);
      return () => clearTimeout(timeout);
    }
  }, [seconds]);
  
  useEffect(() => {
    setSeconds(timer);
    setLabel(getLabel(timer));
  }, [timer]);

  useEffect(() => {
    if (tableNumber && tables && Array.isArray(tables)) {
      const foundTable = tables.find((table) => parseInt(table.number) === tableNumber);
      const tableCount = foundTable ? foundTable.count*5 : 0;
  
      setShoppingState((prevState) => ({
        ...prevState,
        tableCount,
      }));
    }
  }, [tables, tableNumber]);
  

   
  useEffect(() => {
    if (filteredMenu) {
      const updatedFilteredMenu = filteredMenu.map(item => {
        const matchingDish = shoppingState.data.find(obj => obj.dish === item.dish);
        if (matchingDish) {
          return { ...item, quantity: matchingDish.quantity };
        }
        return item;
      });
  
      setCurMenu(updatedFilteredMenu);
      setAreCardsLoaded(true);

    }
  }, [filteredMenu, shoppingState.data]);

  // Category handling
  const handleChangeCategory = (category) => {
    setCategory(category);
    if (menu) {
      if (category === "dishes") {
        setSections(dishesSections);
        setSection(dishesSections[0]);
        setFilteredMenu(menu[category][dishesSections[0]] ?? []);
      } else if (category === "wines") {
        setSections(winesSections);
        setSection(winesSections[0]);
        setFilteredMenu(menu[category][winesSections[0]] ?? []);
      } else {
        setSections([]);
        if (menu[category]) {
          //setFilteredMenu([]);
          setFilteredMenu(menu[category] ?? []); // ? Uncomment this line when the drinks and desserts will be an array
        }
      }
    }
  };

  // Section handling
  const handleChangeSection = (section) => {
    setSection(section);
    if (menu) {
      if (curCategory === "dishes" || curCategory === "wines")
        setFilteredMenu(menu[curCategory][section]);
      else setFilteredMenu(menu[curCategory] ?? []);
    }
  };

  const navigate = useNavigate();
  const handleProceedToOrder = () => {
    navigate('/shopping-cart');
  };
  
  
  useEffect(() => {
    const storedShoppingStateString = JSON.stringify(shoppingState);
    localStorage.setItem('shoppingState', storedShoppingStateString);
  }, [shoppingState]);


  return (
    <section>
      <header className="header">
        <ul className="flex justify-between items-center">
          <li>
            <img src={Logo} alt="logo" />
          </li>
          <li>
            <p className="text-fontPrimary font-semibold">{timeLabel}</p>
          </li>
          {/* <li className="flex justify-center items-center gap-2">
              <img src={ShoppingCartIcon} alt="shopping-cart-icon" />
              <img src={SearchIcon} alt="search-icon" />
            </li> */}
        </ul>
      </header>

      <Spacer height="2rem" />

      <div className="">
        <ul className="flex overflow-x-scroll py-4">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleChangeCategory(category)}
              className="px-[1.5rem] py-[10px]"
            >
              <h3
                className={`font-semibold text-${
                  category === curCategory
                    ? "active underline"
                    : "fontSecondary"
                }`}
              >
                {category.toUpperCase()}
              </h3>
            </li>
          ))}
        </ul>
        <ul className="flex overflow-x-scroll py-4">
          {sections.map((section, index) => (
            <li
              key={index}
              onClick={() => handleChangeSection(section)}
              className="px-[1.5rem] py-[10px]"
            >
              <p
                className={`font-semibold text-${
                  section === curSection ? "active underline" : "fontSecondary"
                }`}
              >
                {section.toUpperCase()}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {areCardsLoaded &&(
        <ul className="overflow-y-scroll">
          {curMenu.map((dish, index) => (
            <li key={index}>
              <MenuCard dishData={dish} imagePath={baseUrl} />
            </li>
          ))}
        </ul>
      )}
        <button className="fixed z-10 w-full h-[5rem] left-[50%] bottom-0 -translate-x-[50%] px-auto py-[0.5rem] text-[#000] uppercase font-medium rounded-full gradient" onClick={handleProceedToOrder} >
          <span className="text-[#000]">
            € {totalPrice} ({totalCount}/{tableCount} piatti)
          </span>
          <p className="text-[#000] uppercase font-semibold">
            procedi all'ordine
          </p>
        </button>
    </section>
  );
};

export default Home;
