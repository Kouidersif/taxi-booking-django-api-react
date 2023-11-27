import { Link } from "react-router-dom";
import driverIcon from "../../assets/svgs/icons8-driver-64.png";
import riderIcon from "../../assets/svgs/icons8-passenger-64.png";
import { useState } from "react";
import useAuthenticate from "./authook/useAuthenticate";
import useGetContext from "../../../context/useGetContext";






const Signup = () => {
    const { authenticateUser } = useAuthenticate()
    const { setErrorAPI } = useGetContext()
    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const [ userPassword, setUserPassword ] = useState("")
    const [ userAccountType, setUserAccountType ] = useState("")

    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        if ( firstName && lastName && emailAddress && userPassword && userAccountType ){
            authenticateUser(firstName, lastName , emailAddress, userPassword, userAccountType )
        }else{
            setErrorAPI("All Fields are required!")
        }
        
    }

    return (
        <div className="flex min-h-full md:py-24 flex-col justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="hidden sm:flex items-center gap-2 justify-center">
                    <div className="w-[20px] h-[20px] bg-mid-night-blue rounded-full"></div>
                    <h1 className="text-2xl font-bold 
                    text-mid-night-blue ">
                        CARCAR</h1>
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account with CarCar
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e)=> setFirstName(e.target.value)}
                                id="firstName"
                                name="firstName"
                                type="text"
                                autoComplete="first name"
                                placeholder="First Name"
                                required={true}
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e)=> setLastName(e.target.value)}
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                autoComplete="Last Name"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
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
                                autoComplete="email"
                                placeholder="name@mailbox.com"
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
                                autoComplete="current-password"
                                placeholder="***********"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="accountType"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Account Type
                            </label>
                        </div>
                        <div className="w-full flex items-center 
                        justify-around">
                            <label className="mt-2 cursor-pointer">
                                <input
                                    onChange={(e)=> setUserAccountType(e.target.value)}
                                    id="driverType"
                                    name="accountType"
                                    type="radio"
                                    required=""
                                    value="driver"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <img src={driverIcon} alt="" />
                                <p className="text-center mt-2">Driver</p>
                            </label>
                            <label className="mt-2 cursor-pointer">
                                <input
                                    onChange={(e)=> setUserAccountType(e.target.value)}
                                    id="riderType"
                                    name="accountType"
                                    type="radio"
                                    required=""
                                    value="rider"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <img src={riderIcon} alt="" />
                                <p className="text-center mt-2">Rider</p>
                            </label>
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
                    Already have an account? {" "}
                    <Link
                        to="/login"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>

    )
}

export default Signup