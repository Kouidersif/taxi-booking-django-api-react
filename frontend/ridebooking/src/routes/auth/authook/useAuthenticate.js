import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGetContext from '../../../../context/useGetContext';
import { jwtDecode } from 'jwt-decode';
import { baseURL } from "../../../../api/AxiosSettings"

/*
    Custom React hook for user authentication.
    This hook facilitates user authentication by making API requests to sign up or log in a user.
    It manages the response data, token storage, user context, and navigation based on user account type.
*/


const useAuthenticate = () => {
    const [ responseData, setResponseData  ] = useState("")
    const navigate = useNavigate()
    const { setErrorAPI, setSuccessMsgAPI, 
        setUserToken, setLoading, userToken, userDecodedToken, setUserDedodedToken } = useGetContext()

    let url;


    if (location.pathname === "/sign-up"){
        url = `${baseURL}auth/`
    }else if(location.pathname === "/login"){
        url = `${baseURL}api/token/`
    }
    const authenticateUser = async (firstName, lastName , emailAddress, userPassword, userAccountType ) =>{
        try{
            setLoading(true)
            const response = await axios.post(url, {
                "first_name":firstName, 
                "last_name":lastName, 
                "email":emailAddress, 
                "password":userPassword, 
                "is_driver":userAccountType === "driver", 
                "is_rider" : userAccountType === "rider"
            } )
            setResponseData(response?.data)
            const aTokens = response?.data?.access
            const rTokens = response?.data?.refresh
            localStorage.clear()
            localStorage.setItem("access_token", JSON.stringify(aTokens))
            localStorage.setItem("refresh_token", JSON.stringify(rTokens))
            const decodedToken = jwtDecode(aTokens)
            setUserToken({
                ...userToken,
                access: aTokens,
                refresh: rTokens,
                isRider: decodedToken.is_rider,
                isDriver : decodedToken.is_driver
            })
            setUserDedodedToken({
                ...userDecodedToken,
                userID: decodedToken?.user_id || null ,
                driver_profile_id: decodedToken?.driver_profile_id || null,
                riderProfileID : decodedToken?.rider_profile_id || null,
            })
            location.pathname === "/sign-up" && setSuccessMsgAPI("Successfully created your account!")
            location.pathname === "/login" && setSuccessMsgAPI("Successfully Logged in!")
            

            if (response?.data?.is_rider || response?.data?.data?.is_rider){
                return navigate("/")
            }
            if (response?.data?.is_driver || response?.data?.data.is_driver){
                // This is related to login, check if has documents or no
                if (!response?.data?.driver_profile?.license_front || !response?.data?.driver_profile?.license_back ){
                    return navigate("/driver/account")
                }
                return navigate("/")
            }
            return navigate("/")
            

        }catch(err){
            console.log(err?.response?.data)
            if (err?.response?.status === 401){
                setErrorAPI("Authentication failed, Please check your Email or Password")
            }else if(err?.response?.status === 500){
                setErrorAPI("Server Error, Please try again later!")
            }else if(err?.response?.status === 400 && err?.response?.data?.email ){
                setErrorAPI( err?.response?.data?.email[0] )
            }else if (err?.response?.status === 400 &&  err?.response?.data?.password ){
                setErrorAPI( err?.response?.data?.password[0] )
            }
        }finally{
            setLoading(false)
        }
    } 



    return { authenticateUser, responseData  }
}

export default useAuthenticate