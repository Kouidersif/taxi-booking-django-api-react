import { useState } from "react"
import { RiderUserData, RiderProfileInfo, SavedAdresses } from "../paths"
import useFetchUsers from "../auth/authook/useFetchUsers";
import useFetchRiderProfile from "./hooks/useFetchRiderProfile";
import useFetchAddresses from "./hooks/useFetchAddresses";

const RiderAccountInfo = () => {
    const [ showPage, setShowPage ] = useState("user");
    const { userInfo } = useFetchUsers()
    const { riderProfile } = useFetchRiderProfile()
    const { riderSavedAdresses, deleteAddress, createNewAddress } = useFetchAddresses()
    return (
        <div className="w-[90%] mx-auto">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mb-4 flex gap-4 justify-center">
                    <button onClick={()=> setShowPage("user")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "user" && "bg-deep-purple text-white" }`}>User Data</button>
                    <button onClick={()=> setShowPage("profile")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "profile" && "bg-deep-purple text-white" }`}>Profile Data</button>
                    <button onClick={()=> setShowPage("adress")} className={`text-xs py-1 sm:py-0 sm:text-base px-3 rounded-sm border-[1px] border-deep-purple ${showPage === "adress" && "bg-deep-purple text-white" }`}>Saved Adress</button>
                </div>
                {
                    showPage === "user" ?
                    <RiderUserData userInfo={userInfo} />
                    : showPage === "profile" ? 
                    <RiderProfileInfo riderProfile={riderProfile} />
                    : showPage === "adress" ?
                    <SavedAdresses riderSavedAdresses={riderSavedAdresses} 
                    deleteAddress={deleteAddress} createNewAddress={createNewAddress} /> : null
                }
            </div>

        </div>
    )
}

export default RiderAccountInfo