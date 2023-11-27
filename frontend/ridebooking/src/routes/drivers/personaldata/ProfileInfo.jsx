import { useState } from "react"
import { Link } from "react-router-dom"
import useUpdateProfile from "../hooks/useUpdateProfile"



const ProfileInfo = ({driverProfile}) => {
    // driver account states //
    const [profileImg, setProfileImg] = useState(null)
    const [driverFrontLicense, setDriverFrontLicense] = useState(null)
    const [driverBackLicense, setDriverBackLicense] = useState(null)
    const { updateProfile } = useUpdateProfile()

    const submitDriverProfile = (e) => {
        e.preventDefault()
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
        updateProfile(formDataInfo, driverProfile?.id)
    }
    return (
        <form className="space-y-6">
                        <div>
                            <label
                                htmlFor="frontImgLicense"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Profile Img
                            </label>
                            <div className="mt-2">
                                <label htmlFor="profileIMGDriver" className="flex gap-2 cursor-pointer">
                                <img className="w-10 h-10 rounded-full object-cover"
                                    src={driverProfile?.profile_picture} alt="Rounded avatar" />
                                <input
                                    id="profileIMGDriver"
                                    name="profileIMGDriver"
                                    type="file"
                                    onChange={(e)=> setProfileImg(e.target.files[0])}
                                    required=""
                                    className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                    rounded-sm cursor-pointer py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                                />
                                </label>
                            </div>
                        </div>
                        <div>
                        <label
                                htmlFor="frontImgLicense"
                                className="text-sm font-medium mb-3 leading-6 text-gray-900 flex justify-between"
                            >
                                Front License
                                <Link to={driverProfile?.license_front} target="_blank" className="text-blue-500">View</Link>
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
                                className="text-sm font-medium mb-3 leading-6 text-gray-900 flex justify-between"
                            >
                                Backside License
                                <Link to={driverProfile?.license_back} target="_blank" className="text-blue-500">View</Link>
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
                                onClick={submitDriverProfile}
                                className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
        </form>
    )
}

export default ProfileInfo