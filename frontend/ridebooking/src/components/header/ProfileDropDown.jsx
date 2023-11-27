import { useEffect, useState } from "react";
import useGetContext from "../../../context/useGetContext";
import useAxios from "../../../api/useAxios";
import { Link } from "react-router-dom";
import { DEFAULT_PROFILE_IMG } from "../../assets/profileImg";


const ProfileDropDown = ({logoutFunc}) => {
    const { userToken, setErrorAPI, userDecodedToken} = useGetContext()
    const [ profile, setProfile ] = useState(null)
    const [ showMenu, setShowMenu ] = useState(false)
    const api = useAxios()
    useEffect(()=>{
        const getUser = async () =>{
            let url;
            if (userToken?.isDriver){
                url = `drivers/profile/${userDecodedToken?.driver_profile_id}/`
            }else if (userToken?.isRider){
                url = `riders/${userDecodedToken?.riderProfileID}/`
            }
            try{
                const response = await api.get(url)
                setProfile(response?.data)
            }catch(err){
                setErrorAPI("Error fetching your profile!")
            }
        }

        getUser()
    }, [])

    return (
        <>
            <button
                onClick={()=> setShowMenu(!showMenu)}
                className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 md:me-0 focus:ring-4 focus:ring-gray-100"
                type="button"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    className="w-8 h-8 me-2 rounded-full"
                    src={profile?.profile_picture || DEFAULT_PROFILE_IMG}
                    alt="user photo"
                />
                {profile?.user?.first_name} {profile?.user?.last_name.substring(0, 1)}.
                <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {/* Dropdown menu */}
            
            <div
                className={`z-50 absolute bg-white divide-y divide-gray-100 
                rounded-lg shadow w-44  ${showMenu ? "" : "hidden"}`}
            >
                <div className="px-4 py-3 text-sm text-gray-900 ">
                    <div>{profile?.user?.first_name} {profile?.user?.last_name.substring(0, 1)}.</div>
                    <div className="font-medium truncate">{profile?.user?.email}. </div>
                </div>
                <ul
                    className="py-2 text-sm text-gray-700 "
                    aria-labelledby="dropdownInformationButton"
                >
                    <li>
                        <Link
                            to={`${ userToken?.isDriver ? "/driver/main" : userToken?.isRider ? `/rider/bookings` : "/" }`}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            <div className="flex justify-between gap-2">
                            <span>Dashboard</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">
                            {profile?.account_status}
                            </span>
                            </div>
                        </Link>
                    </li>
                    {
                        userToken?.isRider &&
                        <li>
                        <Link
                            to="/rider/book"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            <div className="flex justify-between gap-2">
                            <span>Book a ride</span>
                            </div>
                        </Link>
                    </li>
                    }
                    
                    
                    <li>
                        <Link
                            to={`${ userToken?.isDriver ? `/driver/${userDecodedToken?.driver_profile_id}` : userToken?.isRider ? `/rider/${userDecodedToken?.riderProfileID}` : "/" }`}
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Settings
                        </Link>
                    </li>
                </ul>
                <div className="py-2">
                    <button onClick={()=> logoutFunc()}
                        href="#"
                        className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        
                        Logout
                        
                    </button>
                </div>
            </div>
        </>

    )
}

export default ProfileDropDown;