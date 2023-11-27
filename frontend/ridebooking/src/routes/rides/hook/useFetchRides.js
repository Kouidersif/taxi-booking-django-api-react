import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios";
import useGetContext from "../../../../context/useGetContext";


const useFetchRides = (userType, userID) => {
    const [ rides, setRides ] = useState([]);
    const { setErrorAPI, setSuccessMsgAPI, setLoading, successMsgAPI } = useGetContext()

    const api = useAxios()
    // http://127.0.0.1:8000/rides/list-booking?ride_status=Accepted&payment_method=Cash&rider__user__first_name=Marta

    const fetchRides = async ()=>{
        try{
            const response = await api.get(`rides/list-booking`)
            setRides(response?.data)
        }catch(error){
            console.log("error")
        }
    }
    // Update or book a ride
    const updateRide = async (rideID, formData) =>{
        try{
            setLoading(true)
            const response = await api.put(`rides/retrieve-booking/${rideID}/`,
            formData
            )
            setSuccessMsgAPI("Ride status has been changed!")
        }catch(err){
            if (err?.response?.status === 400 && err?.response?.data?.Error ){
                setErrorAPI(err?.response?.data?.Error)
            }if(err?.response?.status === 404){
                setErrorAPI("Ride not found, please try again or refresh page")
            }
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchRides()
    }, [successMsgAPI])
    
    return { rides, updateRide }
}

export default useFetchRides