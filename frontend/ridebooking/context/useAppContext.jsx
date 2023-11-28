import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";


const AppContext = createContext({})


const authToken = {
    accessToken: JSON.parse(localStorage.getItem("access_token")) || "",
    refreshToken: JSON.parse(localStorage.getItem("refresh_token")) || "",
}

export const ContextAppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [errorAPI, setErrorAPI] = useState("")
    const [successMsgAPI, setSuccessMsgAPI] = useState("")
    const aToken = authToken?.accessToken
    
    let decodedToken = {};
    if (aToken) {
        decodedToken = jwtDecode(aToken)
    }
    const [userToken, setUserToken] = useState({
        access: authToken?.accessToken || "",
        refresh: authToken?.refreshToken || "",
        isDriver: decodedToken?.is_driver || null,
        isRider: decodedToken?.is_rider || null,
    })
    const [userDecodedToken, setUserDedodedToken] = useState({
        userID: decodedToken?.user_id || null,
        driver_profile_id: decodedToken?.driver_profile_id || null,
        riderProfileID: decodedToken?.rider_profile_id || null,
    })

    return (
        <AppContext.Provider value={{
            setUserToken, loading, setLoading,
            userToken,
            errorAPI, setErrorAPI,
            successMsgAPI, setSuccessMsgAPI, userDecodedToken, setUserDedodedToken
        }}>
            {children}
        </AppContext.Provider>
    )
}



export default AppContext;