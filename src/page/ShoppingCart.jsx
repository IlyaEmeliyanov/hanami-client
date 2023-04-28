import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";

import InviaDati from "./Functions/InviaDati";

import ShoppingCard from "../components/ShoppingCard";

import LogoWhite from '../images/logo-white.svg';
import SideBar2 from '../images/sidebar2.png';
import Spacer from '../components/common/Spacer'
import shoppingCard from "../components/ShoppingCard";
import Arrow from "../images/icons/Arrow.png";


const ShoppingCart = () => {

    const location = useLocation();
    const shopping = location.state;
    
    const [shoppingState, setShoppingState] = useState(shopping);
    const plates = shoppingState.reduce((acc, item)=> acc + item.qty, 0);
    const total = shoppingState.reduce((acc, item)=> acc + item.price, 0);

    function addDish(id, qty, price, dish, title, quantity,  flag) {
        if ( flag = 0 ){
            const item = {
                "_id": id,
                "qty": qty,
                "price": price,
                "dish": dish,
                "title": title,
                "qty" : quantity
            }
            setShoppingState([...shoppingState, item]);
        }
        else if( flag = 1 ){
            const item ={
                "_id": id,
                "qty": qty,
                "price": price,
                "dish": dish,
                "title": title,
                "quantity": quantity
            }

            const newObj = shoppingState.map(ogg =>{
                if (ogg._id.$oid === item._id || ogg._id.$oid === item._id.$oid || ogg._id.$oid === item._id){
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
                "price": price,
                "dish": dish,
                "title": title,
                "quantity": quantity
            }
            const newObj = shoppingState.map(ogg =>{
                if (ogg._id.$oid === item._id){
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

    const handleOrder = async() =>{
        console.log(shoppingState);
        const response = InviaDati("http://localhost:5500/order", shoppingState, 1);
    }

    const getLabel = (seconds) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

    const MINUTES = 15;

    let [seconds, setSeconds] = useState(MINUTES * 60);
    const [timeLabel, setLabel] = useState(`${MINUTES}:00`);

    return (
        <section className="p-[0] relative">
            <header className="header ml-[4rem] mt-[3rem]">
                <ul className="flex justify-between items-center">
                    <li>
                        <img src={LogoWhite} alt="logo-white" />
                    </li>
                    <li>
                        <p className="text-fontPrimary font-semibold">{timeLabel}</p>
                    </li>
                    <li className="flex justify-center items-center gap-2">
                    </li>
                </ul>
            </header>
            <div className="sideBar fixed z-10 mt-[-5.9rem] h-screen">
                <Link to ="/home" state= {shoppingState}>          
                        <img src = {Arrow} className="z-20 absolute mt-[5rem] ml-[0.5rem]"/>
                </Link>
                <img src={SideBar2} className=" pt-[0rem] mt-[0] h-flu z-15"/>
            </div>
            <Spacer height="4.5rem" />
            <div className="summary h-[3rem] inline">
                <h3 className="text-[white] font-medium text-2xl ml-[2rem] w-[6rem] inline">Il tuo ordine</h3>
                <h3 className=" text-[#EFBB36] inline ml-[5rem] "> Piatti: {plates}</h3 >
            </div>
            <div>
                {shoppingState && shoppingState.map((dish, index) =>
                <li  className="" key ={index}>
                    <ShoppingCard cartData={dish} addDish={addDish}/>
                </li>
                )
            } 
            </div>
            <div className="fixed w-full h-[5rem] left-[50%] bottom-[1rem] -translate-x-[50%] px-auto py-[0.5rem] flex">
                <div className="bg-[#1F2021] w-3/6 h-full mr-[1rem] ml-[2rem] rounded-lg">
                    <h4 className ="text-[white] text-2xl font-light text-center mt-[1rem]">
                        € {total}
                    </h4>
                </div>
                <div className="button gradient w-2/6 " onClick={handleOrder}>
                        <h4 className="relative text-center mt-[1.2rem] font-semibold">
                            ORDINA
                        </h4>
                </div>
            </div>
        </section>
        
    );
}


export default ShoppingCart;