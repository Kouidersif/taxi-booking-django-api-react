import { useLocation, Navigate, Outlet } from "react-router-dom";
import useGetContext from "../../context/useGetContext";




const RequireAuth = () => {
    const { userToken } = useGetContext()
    const location = useLocation()
    return (
        userToken?.access ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace  /> 
    );
}

export const NonAuthenticatedOrRedirect = () =>{
    const { userToken } = useGetContext()
    const location = useLocation()

    return (
        !userToken?.access ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace  /> 
    );
}


export const RiderPermitted = () =>{
    const { userToken } = useGetContext()
    const location = useLocation()

    return (
        userToken?.isRider ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace  /> 
    );
}



export const DriverPermitted = () =>{
    const { userToken } = useGetContext()
    const location = useLocation()

    return (
        userToken?.isDriver ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace  /> 
    );
}





export default RequireAuth;