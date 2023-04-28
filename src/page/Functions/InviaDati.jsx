import React, {useState} from 'react';

const SendData =(url, dati, ntable) =>{


    const data =  ({
                data:{
                    table: ntable,
                    dishes: dati.map(({dish, qty}) => ({dish, qty})),
                }
            });
    

    const InviaDati =async () =>{
        console.log(data);
        

        try {
            const response = await fetch(url,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok){
                throw new Error ('Errore nel server');
            }
            const result = await response.json();
            console.log(result);
        } catch (error){
            console.error('Errore nella richiesta HTTP: ', error);
        }
    }
    console.log(data);
    //InviaDati();
}

export default SendData;