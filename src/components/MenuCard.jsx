// Importing libraries
import React, {useState} from "react";

// Importing components
import Spacer from "./common/Spacer";

// Importing icons
import MinusIcon from '../images/icons/minus.svg'
import PlusIcon from '../images/icons/plus.svg'

const MenuCard = ({dishData, addDish}) => {
    const MAX_COUNT = 5; 
    let [counter, setCounter] = useState(dishData.quantity);
    function addNew () {
      if (counter === 0){
        addDish(dishData._id, counter+1, dishData.price, dishData.dish,dishData.title, 0);
      }
      else if(counter === 5){
      }
      else{
        addDish(dishData._id, counter+1, dishData.price, dishData.dish,dishData.title, 1);
      }
    }
    function subNew(){
      
      if (counter !== 0){
        addDish(dishData._id, counter-1, dishData.price, dishData.dish,dishData.title, -1);
      }
      else{
        addDish(dishData._id, counter, dishData.price, dishData.dish, dishData.title,-2);
      }
    }

    return (
    <article className="w-full text-fontPrimary">
      <div className="relative z-[2] bg-[#222427] drop-shadow-[0_10px_10px_rgba(0,0,0,0.35)] p-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <div className ="m-height-[3rem]">
              <h3 className="text-[1.6rem] font-bold">{dishData.title}</h3>
            </div>
            <Spacer height="5px"/>
            <p className="text-sm text-fontSecondary">
              {dishData.description}
            </p>
          </div>
          <img
            src={require("../images/menu/sushi1.png")}
            alt="sushi-img"
            className="w-[50%] object-fill"
          />
        </div>
        <span className="w-full text-active">{dishData.pieces} pz</span>
      </div>
      <div className="relative z-[1] -translate-y-[2rem] bg-[#1F2021] pt-[4rem] pb-4 px-4 rounded-xl">
        <ul className="flex justify-between items-center">
          <p className="text-active underline">ALLERGIE</p>
          <p className="font-bold">{dishData.price} €</p>
          <div className="flex justify-between items-center gap-[1rem]">
            <button onClick={() => setCounter(counter === 0 ? 0 : --counter)}>      
              <img src={MinusIcon} alt="minus-icon" onClick={subNew}/>
            </button>
            <p className="w-[1rem]">{counter}</p>
            <button onClick={() => setCounter(counter >= MAX_COUNT ? counter : ++counter)}>
              <img src={PlusIcon} alt="minus-icon" onClick ={addNew}/>
            </button>
          </div>
        </ul>
      </div>
    </article>
  );
};

export default MenuCard;
