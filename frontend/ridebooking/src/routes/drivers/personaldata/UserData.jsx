import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useFetchUsers from "../../auth/authook/useFetchUsers"


const UserData = ({userInfo}) => {

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ emailAddress, setEmailAddress ] = useState("")
    const { updateUserAccount } = useFetchUsers()

    useEffect(()=>{
        if(userInfo){
            setFirstName(userInfo?.first_name)
            setLastName(userInfo?.last_name)
            setEmailAddress(userInfo?.email)
        }
    }, [userInfo])

    const handleUpdateClick = (e) =>{
        e.preventDefault()
        const formData = new FormData();

        formData.append("first_name", firstName)
        formData.append("last_name", lastName)
        formData.append("email", emailAddress)
        updateUserAccount(formData)
    }
    return (
    <form className="space-y-6" >
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e)=> setFirstName(e.target.value)}
                                autoComplete="first name"
                                required=""
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
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={lastName}
                                onChange={(e)=> setLastName(e.target.value)}
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
                                id="email"
                                name="email"
                                type="email"
                                value={emailAddress}
                                onChange={(e)=> setEmailAddress(e.target.value)}
                                autoComplete="email"
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
                                id="password"
                                name="password"
                                type="password"
                                value={"*************"}
                                disabled={true}
                                autoComplete="current-password"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleUpdateClick}
                            className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save changes
                        </button>
                    </div>
                </form>
  )
}

export default UserData