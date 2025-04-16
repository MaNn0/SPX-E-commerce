import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [userExist, setUserExist] = useState(false)
    const [success, setSuccess] = useState(false);
    const [counter, setCounter] = useState(3);
    const [userdata, setUserdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate()

    useEffect(() => {
        let interval;
        if (success && counter > 0) {
            interval = setInterval(() => {
                setCounter(prev => prev - 1);
            }, 1000);
        }
        if (counter === 0) {
            navigate('/login');
        }
        return () => clearInterval(interval);
    }, [success, counter, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userdata.password === userdata.confirmPassword) {
                setPasswordMismatch(false);
                const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userdata);
                // console.log('User created:', response.data);
                setSuccess(true)
            } else {
                setPasswordMismatch(true)
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            setUserExist(true)
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="SPX"
                    src="https://static.wixstatic.com/media/2c313e_679f9e1f39d04f2a8a46fcaf872f8dac~mv2.png/v1/fill/w_32,h_32,lg_1,usm_0.66_1.00_0.01/2c313e_679f9e1f39d04f2a8a46fcaf872f8dac~mv2.png"
                    className="mx-auto h-20 w-20"
                />
                <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    Create a new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                    {/* First Name */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
                                First Name
                            </label>
                            <div className="mt-2 me-2">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={(e) => setUserdata({ ...userdata, firstName: e.target.value })}
                                    required
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                                Last Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={e => setUserdata({ ...userdata, lastName: e.target.value })}
                                    required
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={e => setUserdata({ ...userdata, email: e.target.value })}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={e => setUserdata({ ...userdata, password: e.target.value })}
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                onChange={e => setUserdata({ ...userdata, confirmPassword: e.target.value })}
                                required
                                autoComplete="new-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {passwordMismatch && (
                            <p className='text-red-500 mt-2 sm:text-sm/6'>Password Doesn't Match!</p>
                        )}
                        {userExist && !passwordMismatch && (
                            <p className='text-red-500 mt-2 sm:text-sm/6'>User already exists!</p>
                        )}
                        {success && (
                            <p className='text-green-700 mt-2 sm:text-sm/6'>Account Created Successfully!<br /> Redirecting To Signin Page in {counter}  ...</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                        >
                            Sign up
                        </button>
                    </div>
                </form>


                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Already a member?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div >
        </div >
    )
}
