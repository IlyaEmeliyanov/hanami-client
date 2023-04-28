import React,{useEffect, useState} from "react";

// Importing components
import Spacer from "./common/Spacer";
import Sushi1 from "../images/menu/sushi1.png"
import MinusIcon from '../images/icons/minus.svg'
import PlusIcon from '../images/icons/plus.svg'

const ShoppingCard = ({cartData, addDish}) => {
    const MAX_COUNT = 5; 
    let [counter, setCounter] = useState (cartData.qty);
    const id =cartData._id.$oid ? cartData._id.$oid :cartData._id;
    function addNew () {
        if (counter === 0){
          addDish(id, counter+1, cartData.price, cartData.dish, cartData.title, 0);
        }
        else if(counter === 5){
        }
        else{
          addDish(id, counter+1, cartData.price, cartData.dish, cartData.title, 1);
        }
      }
      function subNew(){
        

        if (counter !== 0){
          addDish(id, counter-1, cartData.price, cartData.dish,cartData.title, -1);
        }
        else{
          addDish(id, counter, cartData.price, cartData.dish, cartData.title,-2);
        }
      }

    return (
        <section className="pr-[1rem] pt-[0rem] pb-[0rem]">
            <div className="card h-[6rem] bg-[#222427] rounded-xl flex">
                    <div className ="w-2/6 h-full m-[0] ">
                        <img src={Sushi1} className="h-fit"/>
                    </div>
                    <div className ="w-2/6 h-full align-bottom">
                        <div className="h-[50%] flow-root">
                            <h3 className=" text-[white] text-md font-medium pt-[1rem] inline-block">{cartData.title}</h3>
                        </div>
                        <div className="h-[50%]">
                            <h3 className=" text-[white] text-sm font-small pt-[0.5rem]">€ {cartData.price}</h3>
                        </div>
                    </div>
                    <div className ="w-2/6 h-full  flex">
                        <button className="inline-block ml-[-0.5rem]" onClick={() => setCounter(counter === 0 ? 0 : --counter)}>      
                            <img src={MinusIcon} alt="minus-icon" className="inline-block" onClick={subNew}/>
                        </button>
                        <p className="w-[1rem] text-[white] font-semibold inline-block mt-[2.3rem] ml-[0.5rem]">{counter}</p>
                        <button className ="mr-[0.51rem]" onClick={() => setCounter(counter >= MAX_COUNT ? counter : ++counter)}>
                            <img src={PlusIcon} alt="plus-icon" onClick={addNew}/>
                        </button>
                    </div>
            </div>
        </section>
    );


};

export default ShoppingCard;