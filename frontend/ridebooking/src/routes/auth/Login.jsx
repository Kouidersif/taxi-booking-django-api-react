import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthenticate from "./authook/useAuthenticate";
import useGetContext from "../../../context/useGetContext";

const Login = () => {
    const { authenticateUser } = useAuthenticate()
    const { setErrorAPI } = useGetContext()
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ userPassword, setUserPassword ] = useState("")
    const handleFormSubmit = (e)=>{
        e.preventDefault()
        if (emailAddress && userPassword){
            authenticateUser(null, null , emailAddress, userPassword, null )
            setEmailAddress("");
            setUserPassword("");
        }else{
            setErrorAPI("All fields are required")
        }
    }

    
    return (
        <div className="flex md:py-28 flex-col px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="hidden sm:flex items-center gap-2 justify-center">
                    <div className="w-[20px] h-[20px] bg-mid-night-blue rounded-full"></div> 
                    <h1 className="text-2xl font-bold 
                    text-mid-night-blue ">
                        CARCAR</h1>
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" id="loginForm">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e)=> setEmailAddress(e.target.value)}
                                id="email"
                                name="email"
                                type="email"
                                value={emailAddress}
                                autoComplete="email"
                                placeholder="email@mailbox.com"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <Link
                                    to="#"
                                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={(e)=> setUserPassword(e.target.value)}
                                id="password"
                                name="password"
                                type="password"
                                value={userPassword}
                                placeholder="************"
                                autoComplete="current-password"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleFormSubmit}
                            className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member? {" "}
                    <Link
                        to="/sign-up"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Create an Account now
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login