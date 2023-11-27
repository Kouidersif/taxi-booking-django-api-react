import { useEffect, useState } from 'react'
import { RIDE_STATUS } from '../../rides/conf';
import useFetchRides from '../../rides/hook/useFetchRides';
import useGetContext from '../../../../context/useGetContext';

const useGetStats = () => {
    const { rides } = useFetchRides()
    const { userDecodedToken } = useGetContext()
    const driverID = userDecodedToken?.driver_profile_id
    const [driverStats, setDriverStates] = useState({ ridesCompleted: 0, earningThisWeek: 0, totalEarning: 0 })

    const calculateEarningLastWeek = (allCompletedRides) =>{
        let earnings = 0;
        allCompletedRides.filter((f) => {
            const today = new Date();
            const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate date 7 days ago
            const rideDate = new Date(f?.modified_at);
            const isWithinLast7Days = rideDate >= sevenDaysAgo && rideDate <= today;

            if (isWithinLast7Days) {
                const ridePrice = parseFloat(f?.ride_price);
                earnings += ridePrice;
            }
    })
    return earnings
    }

    const calculateAllTimeEarning = (allCompletedRides) =>{
        let totalEarning = 0
        allCompletedRides?.map((ride)=>{
            totalEarning += parseFloat(ride?.ride_price)
        })

        return totalEarning
    }

    const calculateStats = () => {

        const allCompletedRides = rides?.filter(r => r?.ride_status === RIDE_STATUS.Completed && r?.driver?.id === driverID )
        setDriverStates({
            ...driverStats,
            ridesCompleted: allCompletedRides?.length,
            earningThisWeek: calculateEarningLastWeek(allCompletedRides),
            totalEarning: calculateAllTimeEarning(allCompletedRides),

        })

    }
    useEffect(()=>{
        if (rides){
            calculateStats()
        }
        
    }, [rides])

    return { driverStats, calculateStats }
}

export default useGetStats