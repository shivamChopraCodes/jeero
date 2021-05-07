import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = ({setToggle}) =>{
    let [user, setUser] = useState({
        email : '',
        password : ''
    })
    const handleSubmit = async e => {
        e.preventDefault();

        const {email,password} = user;
        try {
            await auth.signInWithEmailAndPassword(email,password);
            setUser({
                email : '',
                password : ''
            });
        } catch (error) {
            console.error(error);
            
        }

    }

    const handleChange = e =>{
        const {name , value} = e.target;
        setUser(prevValue=>({
            ...prevValue,
            [name] : value
        }));
    } 
    
    return(
        <div className='border-gray-900 m-40  items-center px-96' >
          <form onSubmit={handleSubmit} > 
                       <div className='flex flex-col space-y-8' >
                    <div className='flex flex-col space-y-2' >
                        <p className='text-xl font-medium capitalize' >Email</p>
                        <input type='email' name='email' value={user.email} className='bg-gray-200 border-gray-800 p-1'
                          onChange={handleChange }  />
                    </div>
                    <div className='flex flex-col space-y-2' >
                        <p className='text-xl font-medium capitalize' >Password</p>
                        <input type='password' name='password' value={user.password} className='bg-gray-200 border-gray-800 p-1'
                            onChange={handleChange } 
                        />
                    </div>
                    <div className='flex flex-row space-x-3 pl-10 items-center' >
                    <button type='submit'  className='bg-gray-100 hover:bg-gray-400 hover:text-gray-100 px-10 py-1  text-gray-500 my-2 rounded-sm'  >Login</button>
                    <button onClick={signInWithGoogle} className='bg-blue-700  px-2 py-1 text-gray-100 my-2 rounded-sm'  >Sign In with Google</button>
                    </div>
                    <p onClick={()=>setToggle(prev=> !prev)} className='text-center text-blue-700 underline cursor-pointer' >Sign UP Using Email And Password?</p>
                    </div>
                    </form>
        </div>
    )
}

export default SignIn;