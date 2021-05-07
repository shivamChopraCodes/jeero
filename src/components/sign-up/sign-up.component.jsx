import React, { useState } from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';



const SignUp = ({setToggle}) => {
    const [newUser, setNewUser] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = newUser;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const {user} = await auth.createUserWithEmailAndPassword(email,password);

           await createUserProfileDocument(user,{ displayName });
           setNewUser({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
            
        } catch (error) {
            console.error(error);
            
        }
    };

    const handleChange = event =>{
        const {name , value} = event.target;
        setNewUser(prevValue=>{
            return {
            ...prevValue,
            [name] : value
        }})
    }

    return (
        <div className='sign-up flex flex-col border-gray-900 m-40 w-3/4  items-center px-96'>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form flex flex-col  space-y-4' onSubmit={handleSubmit}>
            <div>
            <p className='text-xl font-medium capitalize' >display name</p>

                <input
                     className='bg-gray-200 border-gray-800 p-1 w-72'
                    type='text'
                    name='displayName'
                    value={newUser.displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                ></input>
                </div>
                <div>
                <p className='text-xl font-medium capitalize' >Email</p>

                <input
                     className='bg-gray-200 border-gray-800 p-1 w-72'
                    type='email'
                    name='email'
                    value={newUser.email}
                    onChange={handleChange}
                    label='Email'
                    required
                ></input>
                </div>
                <div>
                <p className='text-xl font-medium capitalize' >Password</p>

                <input
                     className='bg-gray-200 border-gray-800 p-1 w-72'
                    type='password'
                    name='password'
                    value={newUser.password}
                    onChange={handleChange}
                    label='Password'
                    required
                ></input>
                </div>
                <div>
                <p className='text-xl font-medium capitalize' >Confrim password</p>

                <input
                    className='bg-gray-200 border-gray-800 p-1 w-72'
                    type='password'
                    name='confirmPassword'
                    value={newUser.confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                ></input>
                </div>
                <button type='submit ' className='bg-gray-100 hover:bg-gray-400 hover:text-gray-100 px-10 py-1  text-gray-500 my-2 rounded-sm'>SIGN UP</button>
            </form>
            <p onClick={()=>setToggle(prev=> !prev)} className='text-center text-blue-700 underline cursor-pointer' >Sign In Using Email And Password?</p>

        </div>
    );
};

export default SignUp;
