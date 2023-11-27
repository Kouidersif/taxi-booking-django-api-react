import { useState } from "react";
import useGetContext from "../../../context/useGetContext";
import useUpdateProfile from "./hooks/useUpdateProfile";


const AccountVerification = () => {
    // driver account states //
    const [profileImg, setProfileImg] = useState(null)
    const [driverFrontLicense, setDriverFrontLicense] = useState(null)
    const [driverBackLicense, setDriverBackLicense] = useState(null)
    // Car information states //
    const [vehicleModel, setVehicleModel] = useState("")
    const [vehicleNum, setVehicleNum] = useState("")
    const [ carColor , setCarColor ] = useState("")
    const [ carComfort , setCarComfort ] = useState("")
    const [ carRegistration , setCarRegistration ] = useState("")
    const [ carInsurance , setCarInsurance ] = useState("")
    // End Car information states //
    const { updateProfile, accountFormSubmited, addCar } = useUpdateProfile()
    const { userDecodedToken } = useGetContext();


    const submitDriverProfile = (e) => {
        e.preventDefault()
        console.log("submitteddd")
        const formDataInfo = new FormData();

        if (profileImg && profileImg instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('profile_picture', profileImg);

        }
        if (driverFrontLicense && driverFrontLicense instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('license_front', driverFrontLicense);
        }
        if (driverBackLicense && driverBackLicense instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('license_back', driverBackLicense);
        }
        updateProfile(formDataInfo, userDecodedToken.driver_profile_id)
    }

    const submitCarInfo = (e)=>{
        e.preventDefault()
        const formDataInfo = new FormData();

        formDataInfo.append("driver", userDecodedToken.driver_profile_id)
        formDataInfo.append("vehicle_name_model", vehicleModel  )
        formDataInfo.append("vehicle_number",  vehicleNum)
        formDataInfo.append("vehicle_color",  carColor)
        formDataInfo.append("vehile_comfort",  carComfort)

        if (carRegistration && carRegistration instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('vehicle_registration', carRegistration);

        }
        if (carInsurance && carInsurance instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('vehicle_insurance', carInsurance);
        }
        addCar(formDataInfo)
    }

    return (
        <div className="flex min-h-full md:py-28 flex-col justify-center px-6 lg:px-8 relative">

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Manage your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className={`${accountFormSubmited ? "hidden" : "space-y-6"}`} onSubmit={submitDriverProfile}>
                    <div>
                        <label
                            htmlFor="frontImgLicense"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Profile Img
                        </label>
                        <div className="mt-2">
                            <label htmlFor="profileIMGDriver" className="flex gap-2 cursor-pointer">
                                <img className="w-10 h-10 rounded-full"
                                    src="https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_640.png" alt="Rounded avatar" />
                                <input
                                    id="profileIMGDriver"
                                    name="profileIMGDriver"
                                    type="file"
                                    required=""
                                    onChange={(e)=> setProfileImg(e.target.files[0])}
                                    className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                                />
                            </label>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="frontImgLicense"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Front License
                        </label>
                        <div className="mt-2">
                            <input
                                id="frontImgLicense"
                                name="frontImgLicense"
                                type="file"
                                required=""
                                onChange={(e) => setDriverFrontLicense(e.target.files[0])}
                                className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="backImgLicense"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Backside License
                        </label>
                        <div className="mt-2">
                            <input
                                id="backImgLicense"
                                name="backImgLicense"
                                type="file"
                                required=""
                                onChange={(e) => setDriverBackLicense(e.target.files[0])}
                                className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <form className={`${accountFormSubmited ? "space-y-6" : "hidden"}`}>
                    <div>
                        <label
                            htmlFor="carModel"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Car model
                        </label>
                        <div className="mt-2">
                            <input
                                id="carModel"
                                name="carModel"
                                type="text"
                                placeholder="Nissan Altima"
                                required=""
                                onChange={(e)=> setVehicleModel(e.target.value)}
                                className="block w-full px-1.5 rounded-sm border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="carNumber"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Plate number
                        </label>
                        <div className="mt-2">
                            <input
                                id="carNumber"
                                name="carNumber"
                                type="text"
                                onChange={(e)=> setVehicleNum(e.target.value)}
                                placeholder="T124142C"
                                required=""
                                className="block w-full px-1.5 rounded-sm border-2 py-2 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-[50%]">
                        <label
                            htmlFor="carColor"
                            className="text-sm font-medium leading-6 text-gray-900"
                        >
                            Car Color
                        </label>
                        <div className="mt-2">
                            <select name="carColor" id="carColor" value={carColor} onChange={(e)=> setCarColor(e.target.value)} className="w-full py-2 border-2 ">
                                <option value="Red">Red</option>
                                <option value="Black">Black</option>
                                <option value="Yellow">Yellow</option>
                                <option value="Blue">Blue</option>
                            </select>
                        </div>
                        </div>
                        <div className="w-[50%]">
                        <label
                            htmlFor="carNumber"
                            className="text-sm font-medium leading-6 text-gray-900"
                        >
                            Car Comfort
                        </label>
                        <div className="mt-2">
                            <select name="carColor" id="carColor" value={carComfort} onChange={(e)=> setCarComfort(e.target.value)} className="w-full py-2 border-2 ">
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Luxury">Luxury</option>
                            </select>
                        </div>
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="carInsurance"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Vehicle Insurance
                        </label>
                        <div className="mt-2">
                            <input
                                id="carInsurance"
                                name="carInsurance"
                                type="file"
                                required=""
                                onChange={(e)=> setCarInsurance(e.target.files[0])}
                                className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="carRegistration"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Vehicle Registration
                        </label>
                        <div className="mt-2">
                            <input
                                id="carRegistration"
                                name="carRegistration"
                                type="file"
                                onChange={(e)=> setCarRegistration(e.target.files[0])}
                                required=""
                                className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                        onClick={submitCarInfo}
                            className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >

                            Submit
                        </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default AccountVerification