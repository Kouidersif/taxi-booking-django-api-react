import { useState } from "react";
import useAxios from "../../../../api/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import useGetContext from "../../../../context/useGetContext";


const useUpdateProfile = () => {
    const [accountFormSubmited, setAccountFormSubmited] = useState(false);
    const { setLoading, setErrorAPI, setSuccessMsgAPI } = useGetContext()
    const location = useLocation()
    const navigate = useNavigate()


    const api = useAxios()

    const updateProfile = async (formData, profileID) =>{
        try{
            setLoading(true)
            const response = await api.put(`drivers/profile/${profileID}/`, formData)
            console.log(response)
            setSuccessMsgAPI("Success updated profile")
            setAccountFormSubmited(true)
        }catch(err){
            setErrorAPI("Error happened")
        }finally{
            setLoading(false)
        }
    }
    const addCar = async (formData) =>{
        try{

            const response = await api.post(`drivers/car/`, formData)
            setSuccessMsgAPI("success")
            if(location.pathname === "/driver/account"){
                navigate("/")
            }
            
        }catch(err){
            setErrorAPI("error happend")
            console.log("err", err)
        }
    }



    return { updateProfile, accountFormSubmited, addCar }
}

export default useUpdateProfile