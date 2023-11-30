import { useEffect, useState } from "react";
import useGetContext from "../../../context/useGetContext";
import useFetchRides from "../rides/hook/useFetchRides";
import { RIDE_STATUS } from "../rides/conf";
import 'mapbox-gl/dist/mapbox-gl.css';
import MapComp from "../../components/Map/MapComp";

const BookedRides = () => {
    const { rides } = useFetchRides()
    const { userDecodedToken } = useGetContext()
    const { updateRide } = useFetchRides()
    const [showDropMenu, setShowDropMenu] = useState(false);
    const [rideObj, setRide] = useState({})


    const openRideInfo = (obj) => {
        setRide(obj)
        setShowDropMenu(!showDropMenu)
    }

    const cancelRide = (rideID) => {
        const formData = new FormData();
        formData.append("ride_status", RIDE_STATUS.Canceled)
        updateRide(rideID, formData)
    }


    return (
        <div className="w-full sm:w-[90%] mx-auto sm:pt-16">
            <h1 className="text-center mb-8 sm:text-xl font-semibold hover:text-deep-purple">List of rides</h1>
            <div className="w-full flex gap-2 flex-wrap">
            <section className="p-3 sm:p-5 max-h-full">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    {/* Start coding here */}
                    <div className="bg-white shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                aria-hidden="true"
                                                className="w-5 h-5 text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2"
                                            placeholder="Search"
                                            required=""
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="overflow-x-auto max-h-full">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Ride ID
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Driver
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Pick up
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Destination
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rides?.filter((r) => r?.rider?.id === userDecodedToken?.riderProfileID).map((ride) => (
                                            <tr className="border-b" key={ride?.id}>
                                                <th
                                                    scope="row"
                                                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap"
                                                >
                                                    #{ride?.id}
                                                </th>
                                                <td className="px-4 py-3">{ride?.driver?.user?.first_name?.substring(0, 10) || "No driver..."}</td>
                                                <td className="px-4 py-3">{ride?.pick_up_location?.substring(0, 10)}</td>
                                                <td className="px-4 py-3">{ride?.drop_off_location?.substring(0, 10)}</td>
                                                <td className="px-4 py-3 text-green-500 font-semibold">${ride?.ride_price}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`"bg-green-800 font-semibold text-white p-1 rounded-sm" 
                                                        ${ride?.ride_status === "Completed" ? "bg-gray-300" :
                                                            ride?.ride_status === "In Progress" ? "bg-blue-500" :
                                                                ride?.ride_status === "Pending" ? "bg-orange-500" :
                                                                    ride?.ride_status === "Accepted" ? "bg-green-500" :
                                                                        ride?.ride_status === "Canceled" ? "bg-red-800" :
                                                                            ""}`}>
                                                        {ride?.ride_status}</span></td>
                                                <td className="px-4 py-3 relative">
                                                    <button className="text-base font-extrabold" 
                                                    onClick={() => openRideInfo(ride)}>
                                                    ...</button>
                                                    <div
                                                        className={`z-40 left-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-full ${showDropMenu ? "block" : "hidden"}`}
                                                    >
                                                        {
                                                            rideObj?.id === ride?.id &&
                                                            <ul
                                                                className="py-2 text-sm text-black"
                                                                aria-labelledby="dropdownDefaultButton"
                                                            >
                                                                <li>
                                                                    <span
                                                                        onClick={() => cancelRide(ride?.id)}
                                                                        className="block px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                                                                    >
                                                                        Cancel
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        }
                                                    </div>
                                                </td>
                                                {/* Dropdown menu */}

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <div className={`flex-1 w-full`}>

                    <MapComp rideObj={rideObj} />

            </div>
            </div>
        </div>
    );
};

export default BookedRides;
