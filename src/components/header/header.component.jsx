import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { auth } from '../../firebase/firebase.utils';

const Header = () =>{
    let [currentUser,setCurrentUser] = useContext(UserContext)

    return (
        <div className='header bg-blue-800 text-gray-50 ' >
            <nav className='flex flex-row justify-between' >
                <p className='text-3xl' >Logo</p>
                <div className='flex flex-row ' >
                    <a  href='/dashboards' className ='text-xl px-2 '> Home </a>
                    { 
            currentUser ?
            <Link  className='text-xl px-2 capitalize' onClick={ async ()=> await auth.signOut()}>SIGN OUT</Link>
            :
            <Link className='text-xl px-2 capitalize' to='/signin'>SIGN IN</Link>
          }

                </div>
            </nav>
        </div>
    )
}

export default Header;