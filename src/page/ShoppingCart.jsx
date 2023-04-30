// Importing libraries
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

// Importing context
import { ShoppingContext } from "../context/ShoppingContext";

// Importing components
import ShoppingCard from "../components/ShoppingCard";
import Spacer from "../components/common/Spacer";

// Importing images
import Logo from "../images/logo.svg";
// import SideBar2 from "../images/sidebar2.png";
// import Arrow from "../images/icons/Arrow.png";

const ShoppingCart = () => {
  const getLabel = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const MINUTES = 15;

  let [seconds, setSeconds] = useState(MINUTES * 60);
  const [timeLabel, setLabel] = useState(`${MINUTES}:00`);

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
    e.preventDefault(); // avoid reloading the page
  };

  const [shoppingState, setShoppingState] = useContext(ShoppingContext);
  const { data, totalPrice, totalCount } = shoppingState;



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
