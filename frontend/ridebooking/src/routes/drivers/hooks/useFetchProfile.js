import { useParams } from "react-router-dom";
import useAxios from "../../../../api/useAxios";
import { useEffect, useState } from "react";



const useFetchProfile = () => {
    const { id } = useParams()
    const [ driverProfile, setDriverProfile ] = useState(null)
    const api = useAxios()

    const fetchDriverData  = async ()=>{
        try{
            const response = await api.get(`drivers/profile/${id}`);
            setDriverProfile(response?.data)
        }catch(err){
            console.log("response Error", err)
        }
    }

    useEffect(()=>{
        
        fetchDriverData()
    }, [])

    return { driverProfile }
}

export default useFetchProfile