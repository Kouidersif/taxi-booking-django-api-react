import { useState } from "react";
import { DEFAULT_PROFILE_IMG } from "../../../assets/profileImg";
import useFetchRiderProfile from "../hooks/useFetchRiderProfile";



const RiderProfileInfo = ({riderProfile}) => {
    const [ riderProfileImg, setRiderProfileImg ] = useState(null)
    const { updateRiderProfileData } = useFetchRiderProfile()

    const handleUpdate = (e) =>{
        e.preventDefault()
        const formDataInfo = new FormData();

        if (riderProfileImg && riderProfileImg instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('profile_picture', riderProfileImg);

        }
        updateRiderProfileData(formDataInfo)
    }
    return (
        <form className="space-y-6">
                    <div className="mb-8">
                        <label
                            htmlFor="frontImgLicense"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Profile Img
                        </label>
                        <div className="mt-2">
                            <label htmlFor="profileIMGDriver" className="flex gap-2 cursor-pointer">
                            <img className="w-10 h-10 rounded-full"
                                src={riderProfile?.profile_picture || DEFAULT_PROFILE_IMG} alt="Rounded avatar" />
                            <input
                                id="profileIMGDriver"
                                name="profileIMGDriver"
                                type="file"
                                required=""
                                onChange={(e)=> setRiderProfileImg(e.target.files[0])}
                                className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                            />
                            </label>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handleUpdate}
                            type="submit"
                            className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
  )
}

export default RiderProfileInfo;