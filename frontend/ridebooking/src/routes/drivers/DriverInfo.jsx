import { useState } from "react"
import { CarInfo, ProfileInfo, UserData } from "../paths"
import useFetchProfile from "./hooks/useFetchProfile";
import useFetchUsers from "../auth/authook/useFetchUsers";
import useFetchCar from "./hooks/useFetchCar";

const DriverInfo = () => {
    const [ showPage, setShowPage ] = useState("user");
    const { driverProfile } = useFetchProfile()
    const { driverCar, deleteCar } = useFetchCar()
    const { userInfo } = useFetchUsers()

    return (
        <div className="w-[90%] mx-auto">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mb-4 flex gap-4 justify-center">
                    <button onClick={()=> setShowPage("user")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "user" && "bg-deep-purple text-white" }`}>User Data</button>
                    <button onClick={()=> setShowPage("profile")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "profile" && "bg-deep-purple text-white" }`}>Profile Data</button>
                    <button onClick={()=> setShowPage("car")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "car" && "bg-deep-purple text-white" }`}>Car</button>
                </div>
                {
                    showPage === "user" ?
                    <UserData userInfo={userInfo} />
                    : showPage === "profile" ? 
                    <ProfileInfo driverProfile={driverProfile} />
                    : showPage === "car" ?
                    <CarInfo driverCar={driverCar} deleteCar={deleteCar} /> : null
                }
                
                
                
            </div>

        </div>
    )
}

export default DriverInfo;