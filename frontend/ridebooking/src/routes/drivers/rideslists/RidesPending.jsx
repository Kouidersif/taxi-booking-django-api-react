import useGetContext from "../../../../context/useGetContext";



const RidesPending = ({ pendingRides, setRide ,updateRide, RIDE_STATUS }) => {
    const { userDecodedToken } = useGetContext()

    const reserveRide = (rideID) =>{
        const fromData = new FormData();
        fromData.append("driver_id", userDecodedToken?.driver_profile_id)
        fromData.append("ride_status", RIDE_STATUS.Accepted)
        updateRide(rideID, fromData)
    }


    return (
        <ul className="w-full shadow-xl border-2 border-blue-500 overflow-y-scroll max-h-[600px]">
            {
                pendingRides.length ? 
                pendingRides?.map((ride) => (
                    <li key={ride?.id} className="flex text-xs sm:text-base py-1 justify-between 
                    px-3 sm:mb-2 sm:py-2 cursor-pointer hover:bg-slate-200">
                        <span className='font-semibold text-slate-400'>#{ride?.id}</span>
                        <span className='font-semibold'>{ride?.rider?.email || "Rider"}</span>
                        <span className='font-semibold'>{ride?.pick_up_location.substring(0, 10)}</span>
                        <span className='font-semibold'>{ride?.drop_off_location.substring(0, 10)}</span>
                        <span className="bg-orange-400 rounded-full px-2 text-white">{ride?.ride_status}</span>
                        <button onClick={() => reserveRide(ride?.id)} className="bg-blue-700 rounded-full px-2 text-white">Book</button>
                        <button onClick={()=> setRide(ride)} className="bg-green-700 rounded-full px-2 text-white">View</button>
                    </li>
                ))
                :
                <li>
                        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                        <span className="font-medium">Info alert!</span> There are no pending rides yet...
                    </div>
                </li>
            }

        </ul>
    )
}

export default RidesPending;