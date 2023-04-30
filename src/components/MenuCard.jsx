// Importing libraries
import React, { useContext, useEffect, useState } from "react";

// Importing components
import Spacer from "./common/Spacer";

// Importing icons
import MinusIcon from "../images/icons/minus.svg";
import PlusIcon from "../images/icons/plus.svg";

import { ShoppingContext } from "../context/ShoppingContext";

const MenuCard = ({ dishData }) => {
  const [shoppingState, setShoppingState] = useContext(ShoppingContext);

  const { title, description, dish, pieces, quantity, price } = dishData;

  const MAX_COUNT = 5;

  let [counter, setCounter] = useState(0);

  const addData = () => {
    setCounter(counter >= MAX_COUNT ? counter : ++counter); // increment counter of single card
    const item = shoppingState.find(item => item.dish === dish); // find the element in the global context

    if (item) { // if present in the state then update the quantity
      item.quantity = counter;
    } else { // otherwise push it to the global context
      shoppingState.push({
        title, description, dish, pieces, quantity: counter, price
      });
    }
    setShoppingState(shoppingState); // update the state
    console.log(shoppingState)
  }

  const removeData = () => {
    setCounter(counter === 0 ? 0 : --counter); // decrement counter of single card
    const item = shoppingState.find(item => item.dish === dish); // find the element in the global context

    if (item) { // if present in the state then update the quantity
      if (counter === 0) { // if counter set to 0 then remove the element from the global context
        shoppingState.splice(shoppingState.indexOf(item), 1);
      } else { // otherwise update the quantity
        item.quantity = counter;
      }
    }
    setShoppingState(shoppingState); // update the state
    console.log(shoppingState)
  }

  return (
    <article className="w-full text-fontPrimary">
      <div className="relative z-[2] bg-[#222427] drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)] p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[1.6rem] font-bold">{title}</h3>
            <Spacer height="5px" />
            <p className="text-sm text-fontSecondary">{description}</p>
          </div>
          <img
            src={require("../images/menu/sushi1.png")}
            alt="sushi-img"
            className="w-[50%] object-fill"
          />
        </div>
        <span className="w-full text-active">{pieces} Pz</span>
      </div>
      <div className="relative z-[1] -translate-y-[2rem] bg-[#1F2021] pt-[4rem] pb-4 px-4 rounded-xl">
        <ul className="flex justify-between items-center">
          <p className="text-active underline">ALLERGIE</p>
          <p className="font-bold">€ {price}</p>
          <div className="flex justify-between items-center gap-[1rem]">
            <button onClick={removeData}>
              <img src={MinusIcon} alt="minus-icon" />
            </button>
            <p className="w-[1rem]">{counter}</p>
            <button
              onClick={addData}
            >
              <img src={PlusIcon} alt="minus-icon" />
            </button>
          </div>
        </ul>
      </div>
    </article>
  );
};

export default MenuCard;
