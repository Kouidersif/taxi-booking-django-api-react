import { useNavigate } from "react-router-dom";
import useAxios from "../../../../api/useAxios";
import useGetContext from "../../../../context/useGetContext";
import { useState } from "react";

/*
    Custom React hook for handling user logout.
    This hook logs out a user by blacklisting their refresh token,
    clearing local storage, updating user context, and managing the user's logged-in state.
*/




const useLogout = () => {
    const { setLoading, setUserToken, userToken, setSuccessMsgAPI, setErrorAPI } = useGetContext()
    const [ isLoggedIn, setIsLoggedIn ] = useState(!!userToken.access);

    const api = useAxios()
    const navigate = useNavigate()
    const logoutFunc = async () =>{
        try{
            setLoading(true)
            const response = await api.post("/api/token/blacklist/", {
                refresh:userToken.refresh
            })
            localStorage.clear()
            setUserToken({
                ...userToken, 
                access: "",
                refresh: "",
                isDriver : false,
                isRider : false,
            })
            setIsLoggedIn(false)
            setSuccessMsgAPI("Thank you for spending time with CarCar")
            navigate("/")
        }catch(err){
            if(err?.response?.status === 500){
                setErrorAPI("Server Error, Please try again later!")
            }else{
                setErrorAPI("Error happened...")
            }
        }finally{
            setLoading(false)
        }
    }
    

    return { logoutFunc, isLoggedIn }
}

export default useLogout