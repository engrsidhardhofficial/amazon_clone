import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async e => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) {
            alert(error.message)
        } else {
            navigate('/')
        }
    }

    const register = async e => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            alert(error.message)
        } else {
            if (data) {
                navigate('/')
            }
        }
    }

    return (
        <div className='bg-white h-screen flex flex-col items-center'>
            <Link to='/'>
                <img
                    className="my-5 object-contain w-24 mx-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon Logo"
                />
            </Link>

            <div className='w-80 h-fit flex flex-col rounded-md border border-gray-300 p-5'>
                <h1 className='font-medium text-3xl mb-5'>Sign-in</h1>

                <form>
                    <h5 className='mb-1 font-bold'>E-mail</h5>
                    <input
                        type='text'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='h-8 mb-2 bg-white w-full border border-gray-400 rounded-sm px-2'
                    />

                    <h5 className='mb-1 font-bold'>Password</h5>
                    <input
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='h-8 mb-2 bg-white w-full border border-gray-400 rounded-sm px-2'
                    />

                    <button
                        type='submit'
                        onClick={signIn}
                        className='bg-amazon-yellow w-full h-8 rounded-sm border border-yellow-600 mt-2 hover:bg-yellow-500'
                    >
                        Sign In
                    </button>
                </form>

                <p className='mt-4 text-xs'>
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button
                    onClick={register}
                    className='w-full h-8 rounded-sm border border-gray-400 mt-4 bg-gray-100 hover:bg-gray-200'
                >
                    Create your Amazon Account
                </button>
            </div>
        </div>
    )
}

export default Login;
