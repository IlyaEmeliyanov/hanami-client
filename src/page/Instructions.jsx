
// Importing libraries
import React from "react";
import { useNavigate } from "react-router-dom";
import Spacer from "../components/common/Spacer";
import Logo from "../images/logo.svg";


function Instructions () {
    
    let navigate = useNavigate();
    const routeChange =() =>{
        let path = "/home";
        navigate(path);
    }

    return(
        <section>
            <img src={Logo} className="w-[60%] ml-[4rem]"/>
            <div className='bg-[#222427] mt-[3rem] text-[#fff] rounded-b-3xl'>
                <h3 className='text-center text-2xl pt-[3rem] font-bold tracking-wider'>INSTRUCTIONS</h3>
                    <div className='pl-[4rem] pr-[4rem]'>
                        <ol type="1">
                            <li className='text-md mt-[3rem]'>
                                Select the category at the top.
                            </li>
                            <li className='text-md mt-[1rem]'>
                                Select the dishes you want to order. You can order at most 2 big dishes and 3 small ones at a time.
                            </li>
                            <li>
                                <p className="text-md mt-[1rem]">Once you've finished go to the shopping cart and proceed with the order.</p>
                            </li>
                            <li>
                                <p className="text-md mt-[1rem]">When you click the place order button, you will be no longer able to order for the next <b>15 minutes</b></p>
                            </li>
                        </ol>
                    </div>
                <div className='w-25 h-14 rounded-3xl bg-gradient-to-r from-giallo to-arancio text-center mt-[3rem] mb-[1rem] ml-[1.5rem] mr-[1.5rem] text-black' onClick={routeChange}>
                    <p className ='pt-[1rem]'>GOT IT</p>
                </div>
                
                <Spacer height="1rem" />
            </div>
        </section>
    );
};

export default Instructions;