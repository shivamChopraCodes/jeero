import React, { useEffect } from 'react';
import { logData } from '../../firebase/firebase.utils';

const Header = () =>{
    useEffect(()=>{
    let userref = logData();
    console.log(userref)
    });

    return (
        <div className='header bg-blue-800 text-gray-50 ' >
            <nav className='flex flex-row justify-between' >
                <p className='text-3xl' >Logo</p>
                <div className='flex flex-row ' >
                    <a  href='/dashboards' className ='text-xl px-2 '> Home </a>
                    <p className ='text-xl px-2'> Profile </p>
                    <p className ='text-xl px-2 '> Logout </p> 

                </div>
            </nav>
        </div>
    )
}

export default Header;