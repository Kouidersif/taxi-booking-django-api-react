import { useEffect, useState } from "react"
import useGetContext from "../../../context/useGetContext"
import useFetchRides from "../rides/hook/useFetchRides"
import useGetStats from "./stats/useGetStats"
import RidesCompleted from "./rideslists/RidesCompleted"
import RidesPending from "./rideslists/RidesPending"
import ActiveRide from "./rideslists/ActiveRide"
import { RIDE_STATUS } from "../rides/conf";
import MapComp from "../../components/Map/MapComp"


const RidesPage = () => {
    const { userDecodedToken } = useGetContext()
    const { rides, updateRide } = useFetchRides()
    const driverID = userDecodedToken?.driver_profile_id
    const [activeRide, setActiveRide] = useState(null)
    const [rideObj, setRide] = useState({})

    const { driverStats } = useGetStats();
    const [ ridesObject, setRidesObject ] = useState({
        pendingRides : [],
        completedRides :[]
    });

    const updateRideStatus = (rideID, rideStatus) => {
        const formData = new FormData();
        formData.append("ride_status", rideStatus)
        updateRide(rideID, formData)
    }
    
    
    useEffect(() => {
        if (rides) {
            const driverAcceptedRide = rides?.filter((r) => r?.ride_status !== RIDE_STATUS.Pending
                && r?.ride_status !== RIDE_STATUS.Completed && r?.driver?.id === driverID)
            setActiveRide(driverAcceptedRide[0])
            setRidesObject({
                ...ridesObject,
                pendingRides : rides?.filter((r) => r.ride_status === RIDE_STATUS.Pending),
                completedRides : rides?.filter((r) => r?.ride_status === RIDE_STATUS.Completed && r?.driver?.id === driverID),

            })
        }
    }, [rides])




    return (
        <>
            <div className="w-[90%] mx-auto pt-12 h-[100vh]">
                <div className="w-full flex gap-4 flex-wrap lg:flex-nowrap ">
                    {/* Rides stats */}
                    <div className="w-full h-full lg:w-[50%]">
                        <ul className="flex justify-between items-center gap-4 mb-3">
                            <li className="w-[33%] min-h-[8rem] border-2 flex 
                    flex-col items-center justify-center gap-4 rounded-md">
                                <h3 className="leading-6 text-3xl font-semibold">{driverStats.ridesCompleted || 0}</h3>
                                <p className="text-slate-500">Total rides</p>
                            </li>
                            <li className="w-[33%] min-h-[8rem] border-2 flex 
                    flex-col items-center justify-center gap-4 rounded-md">
                                <h3 className="leading-6 text-3xl font-semibold">${driverStats.earningThisWeek || 0}</h3>
                                <p className="text-slate-500">Weekly Earning</p>
                            </li>
                            <li className="w-[33%] min-h-[8rem] border-2 flex 
                    flex-col items-center justify-center gap-4 rounded-md">
                                <h3 className="leading-6 text-3xl font-semibold">${driverStats.totalEarning || 0}</h3>
                                <p className="text-slate-500">Total Earning</p>
                            </li>

                        </ul>
                        {/* pendingRides */}
                        <div>
                            <h1 className="text-center my-3 text-xl font-semibold hover:text-blue-500">Book your next ride</h1>
                            <RidesPending setRide={setRide} updateRide={updateRide} pendingRides={ridesObject?.pendingRides} RIDE_STATUS={RIDE_STATUS} />
                        </div>
                        {/* Accepted ride */}
                        <ActiveRide activeRide={activeRide} 
                        updateRideStatus={updateRideStatus} setRide={setRide} RIDE_STATUS={RIDE_STATUS} />
                        {/* End */}
                    </div>
                    {/* End Rides stats */}
                    <div className="flex-1">
                        <MapComp rideObj={rideObj} />
                        <div className="mt-3">
                            <h1 className="text-center font-semibold text-xl mb-3">List of Completed Rides</h1>
                            <RidesCompleted finishedRides={ridesObject.completedRides}  />
                        </div>

                    </div>

                </div>

            </div>
            {/* Ride Details */}
        </>
    )
}

export default RidesPage