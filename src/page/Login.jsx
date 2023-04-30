import React from 'react';

// Importing components
import Spacer from '../components/common/Spacer'

// Importing images
import LoginBg from '../images/login-bg.png'
import Logo from '../images/logo.svg'

// Importing icons
import LockIcon from '../images/icons/lock.svg'

const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submit");
    }

    return (
        <section className="flex flex-col justify-between items-center">
            <img className="absolute top-0 left-0 w-full h-full object-cover z-[-1] blur-lg opacity-20" src={LoginBg}/>
            <img src={Logo} alt="logo"/>
            <Spacer height="3rem"/>
            <p className="text-fontSecondary text-center">Insert the code for your table for logging in and start ordering.</p>
            <Spacer height="3rem"/>
            <form className='w-full' onSubmit={handleSubmit}>
                <div className="relative">
                    <img className="absolute top-[50%] left-[2rem] -translate-y-[50%]" src={LockIcon}/>
                    <input className="w-full bg-[#030D17] px-auto py-[1.5rem] text-fontSecondary text-md md:text-xl uppercase text-center rounded-full" placeholder="INSERT CODE" maxLength={6} type="text" />
                </div>
                <Spacer height="1rem"/>
                <button className="w-full px-auto py-[1.5rem] text-[#000] uppercase font-medium rounded-full gradient" type='submit'>Continue</button>
            </form>
        </section>
    );
}

export default Login;