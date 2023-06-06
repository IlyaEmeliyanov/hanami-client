// Importing libraries
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Importing context
import { ShoppingContext } from "../context/ShoppingContext";

// Importing components
import ShoppingCard from "../components/ShoppingCard";
import Spacer from "../components/common/Spacer";

// Importing images
import Logo from "../images/logo.svg";
import SideBar from "../images/sidebar.svg";
import Arrow from "../images/icons/Arrow.png";

const ShoppingCart = () => {
  const [timer, setTimer] = useState(0);

  const [shoppingState, setShoppingState] = useContext(ShoppingContext);
  const { data, totalPrice, totalCount, tableNumber } = shoppingState;

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

    //timer request
    const fetchTimer = async () => {
      const body = {
        table: tableNumber
      }
      try {
        const response = await fetch("http://localhost:5500/timer", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ table: tableNumber})
        });
        const data = await response.json();
        let counter = data.counter;
        console.log("RICHIESTA: ", counter)
        if(counter<0){ counter=0;}
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
  
  // setInterval(() => {
  //   if (seconds > 0) {
  //     seconds--;
  //     setSeconds(seconds);
  //     setLabel(getLabel(seconds));
  //   } else {
  //     setLabel("00:00");
  //   }
  // }, 1000);

  const handleOrder = (e) => {
    const body = {
      table: tableNumber,
      dishes: data
    }
    e.preventDefault(); // avoid reloading the page

    try {
      fetch("http://localhost:5500/order", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
     .then((response) => {// Controllo della risposta
        setShoppingState((prevState) => ({ // Svuota il campo "data"
          ...prevState,
          totalCount:0,
          totalPrice:0,
          data: [],
        }));
     })
     .catch((error) => {
        console.error('Errore nella richiesta /order', error);
     });
    } catch (error) {
      console.error('Errore nella richiesta /order', error);
    }
  };


  let navigate = useNavigate();
    const routeChange =() =>{
        let path = "/Home";
        navigate(path);
    }

    useEffect(() => {
      const storedShoppingStateString = JSON.stringify(shoppingState);
      localStorage.setItem('shoppingState', storedShoppingStateString);
    }, [shoppingState]);



  return (
    <section className="p-[0] relative">
      <header className="header ml-[4rem] mt-[3rem]">
        <ul className="flex justify-between items-center">
          <li>
            <img src={Logo} alt="logo-white" />
          </li>
          <li>
            <p className="text-fontPrimary font-semibold">{timeLabel}</p>
          </li>
          <li className="flex justify-center items-center gap-2"></li>
        </ul>
      </header>

      <div className="absolute top-[-4rem] left-0 h-screen flex flex-col">
        <img src={SideBar} className="flex-1 z-1"/>
        <img src={Arrow} className="z-10 absolute mt-[4.4rem] ml-[.3rem]" onClick={routeChange}/>
      </div>

      <div className="sideBar fixed z-10 mt-[-5.9rem] h-screen">
        <Link to="/home">
          {/* <img src={Arrow} className="z-20 absolute mt-[5rem] ml-[0.5rem]" /> */}
        </Link>
        {/* <img src={SideBar2} className=" pt-[0rem] mt-[0] h-flu z-15" /> */}
      </div>
      <Spacer height="4.5rem" />
      <div className="summary h-[3rem] inline">
        <h3 className="text-[white] font-medium text-2xl ml-[2rem] w-[6rem] inline">
          Il tuo ordine
        </h3>
        <h3 className=" text-[#EFBB36] inline ml-[5rem] "> Piatti: {totalCount}</h3>
      </div>
      <div>
        {data &&
          data.map((dish, index) => (
            <li key={index}>
              <ShoppingCard dishData={dish} />
            </li>
          ))}
      </div>
      <div className="fixed w-full h-[5rem] left-[50%] bottom-[1rem] -translate-x-[50%] px-auto py-[0.5rem] flex">
        <div className="bg-[#1F2021] w-3/6 h-full mr-[1rem] ml-[2rem] rounded-lg">
          <h4 className="text-[white] text-2xl font-light text-center mt-[1rem]">
            € {totalPrice}
          </h4>
        </div>
        {/* <Link to="/home"> */}
        <button
          className="button gradient w-[100%] h-[4rem]"
          onClick={handleOrder}
        >
          <h4 className="relative text-center font-semibold uppercase">
            Order
          </h4>
        </button>
        {/* </Link> */}
      </div>
    </section>
  );
};

export default ShoppingCart;
