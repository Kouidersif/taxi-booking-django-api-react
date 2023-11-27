import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios";
import useFetchProfile from "./useFetchProfile";


const useFetchCar = () => {
    const [ driverCar, setDriverCar ] = useState(null);
    const { driverProfile } = useFetchProfile()
    const api = useAxios()

    const fetchDriverCar = async () =>{
        try{
            const response = await api.get(`drivers/car/${driverProfile?.driver_car?.id}/`)
            setDriverCar(response?.data)
        } catch(error){
            console.log("error", error)
        }
    }
    const deleteCar = async (carID, event) =>{
        event.preventDefault()
        try{
            const response = await api.delete(`drivers/car/${carID}/`)
            setDriverCar(response?.data)
        } catch(error){
            console.log("error", error)
        }
    }

    useEffect(()=>{
        if(driverProfile){
            fetchDriverCar()
        }
    }, [driverProfile])

    return { driverCar, fetchDriverCar, deleteCar }
}

export default useFetchCar