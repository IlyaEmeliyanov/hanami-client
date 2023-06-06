// Importing libraries
import React, { useContext, useState } from "react";

// Importing context
import { ShoppingContext } from "../context/ShoppingContext";

// Importing images
import ShushiPlaceholder from "../images/menu/sushi1.png";
import MinusIcon from "../images/icons/minus.svg";
import PlusIcon from "../images/icons/plus.svg";

const ShoppingCard = ({ dishData }) => {
  const [shoppingState, setShoppingState] = useContext(ShoppingContext);
  let { data, totalPrice, totalCount, tableNumber, tableCount } = shoppingState;

  const { title, description, dish, pieces, quantity, price } = dishData;
  let [counter, setCounter] = useState(quantity);
 
  const MAX_COUNT = tableCount;

  const addData = () => {
    if (totalCount < MAX_COUNT) {
      totalCount++; // ! update immediatly totalCount, otherwise no order will be added
      setCounter(counter <= totalCount ? ++counter : counter); // increment counter of single card

      const item = data.find((item) => item.dish === dish); // find the element in the global context

      if (counter <= totalCount && totalCount <= MAX_COUNT) {
        if (item) {
          // if present in the state then update the quantity
          item.quantity = counter;
          totalPrice += item.price;
        } else {
          // otherwise push it to the global context
          data.push({
            title,
            description,
            dish,
            pieces,
            quantity: counter,
            price,
          });
          totalPrice += price;
        }
      }
      setShoppingState({ data, totalPrice, totalCount, tableNumber, tableCount }); // update the state
    }
    
  };

  const removeData = () => {
    if (counter > 0) {
        console.log("remove data: 1")
        setCounter(--counter); // decrement counter of single card
        const item = data.find((item) => item.dish === dish); // find the element in the global context
    
        if (item) {
          // if present in the state then update the quantity
          totalPrice -= item.price;
          totalCount--;
          if (counter === 0) {
            // if counter set to 0 then remove the element from the global context
            const newData = data.filter((item) => item.dish !== dish);
            setShoppingState({ data: newData, totalPrice, totalCount, tableNumber, tableCount });
          } else {
            // otherwise update the quantity
            item.quantity = counter;
            setShoppingState({ data, totalPrice, totalCount, tableNumber, tableCount});
          }
        }
       // setShoppingState({ data, totalPrice, totalCount, tableNumber}); // update the state
    }
  };

  return (
    <section className="pr-[1rem] pt-[0rem] pb-[0rem]">
      <div className="card h-[6rem] bg-[#222427] rounded-xl flex">
        <div className="w-2/6 h-full m-[0] ">
          <img src={ShushiPlaceholder} className="object-cover" />
        </div>
        <div className="w-2/6 h-full align-bottom">
          <div className="h-[50%] flow-root">
            <h3 className=" text-[white] text-md font-medium pt-[1rem] inline-block">
              {title}
            </h3>
          </div>
          <div className="h-[50%]">
            <h3 className=" text-[white] text-sm font-small pt-[0.5rem]">
              € {price}
            </h3>
          </div>
        </div>
        <div className="w-2/6 h-full flex">
          <button className="inline-block ml-[-0.5rem]" onClick={removeData}>
            <img src={MinusIcon} alt="minus-icon" className="inline-block" />
          </button>
          <p className="w-[1rem] text-[white] font-semibold inline-block mt-[2.3rem] ml-[0.5rem]">
            {counter}
          </p>
          <button className="mr-[0.51rem]" onClick={addData}>
            <img src={PlusIcon} alt="plus-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCard;
