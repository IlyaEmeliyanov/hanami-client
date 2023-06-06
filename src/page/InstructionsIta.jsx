
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
                <h3 className='text-center text-2xl pt-[3rem] font-bold tracking-wider'>ISTRUZIONI</h3>
                    <div className='pl-[4rem] pr-[4rem]'>
                        <ol type="1">
                            <li className='text-md mt-[3rem]'>
                                Seleziona la categoria desiderata.
                            </li>
                            <li className='text-md mt-[1rem]'>
                                Aggiungi i piatti che si desidera ordinare. E' possibile ordinare al massimo 5 piatti a persona.
                            </li>
                            <li>
                                <p className="text-md mt-[1rem]">Quando si avrà terminato, si potrà procedere all'ordine.</p>
                            </li>
                            <li>
                                <p className="text-md mt-[1rem]">Quando tutti i piatti verranno ordinati, non si potrà effettuare un nuovo ordine per i prossimi <b>15 minuti</b></p>
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