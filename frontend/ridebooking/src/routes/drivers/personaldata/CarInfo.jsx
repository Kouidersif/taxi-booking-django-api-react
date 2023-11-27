import { useEffect, useState } from "react";
import { Link } from "react-router-dom";




const CarInfo = ({ driverCar, deleteCar }) => {

    // Car information states //
    const [vehicleModel, setVehicleModel] = useState("")
    const [vehicleNum, setVehicleNum] = useState("")
    const [carColor, setCarColor] = useState("")
    const [carComfort, setCarComfort] = useState("")
    const [carRegistration, setCarRegistration] = useState("")
    const [carInsurance, setCarInsurance] = useState("")


    useEffect(() => {
        setVehicleModel(driverCar?.vehicle_name_model || "")
        setVehicleNum(driverCar?.vehicle_number || "")
        setCarColor(driverCar?.vehicle_color || "")
        setCarComfort(driverCar?.vehile_comfort || "")
        setCarRegistration(driverCar?.vehicle_registration || "")
        setCarInsurance(driverCar?.vehicle_insurance || "")
    }, [])


    const submitCarInfo = (e) => {
        e.preventDefault()
        const formDataInfo = new FormData();

        formDataInfo.append("vehicle_name_model", vehicleModel)
        formDataInfo.append("vehicle_number", vehicleNum)
        formDataInfo.append("vehicle_color", carColor)
        formDataInfo.append("vehile_comfort", carComfort)

        if (carRegistration && carRegistration instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('vehicle_registration', carRegistration);

        }
        if (carInsurance && carInsurance instanceof File) {
            // Append the profileImg only if it's selected and a valid File object
            formDataInfo.append('vehicle_insurance', carInsurance);
        }

    }


    return (
        <>{

        
        driverCar ?
            <form className="space-y-6">
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
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            placeholder="Nissan Altima"
                            required=""
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
                            value={vehicleNum}
                            onChange={(e) => setVehicleNum(e.target.value)}
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
                            <select name="carColor" id="carColor" value={carComfort}
                                onChange={(e) => setCarComfort(e.target.value)} className="w-full py-2 border-2 ">
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
                        className="text-sm font-medium leading-6 text-gray-900 flex justify-between items-center"
                    >
                        Vehicle Insurance
                        <Link to={carInsurance} target="_blank" className="text-blue-500">View</Link>
                    </label>
                    <div className="mt-2">
                        <input
                            id="carInsurance"
                            name="carInsurance"
                            type="file"
                            onChange={(e) => setCarInsurance(e.target.files[0])}
                            required=""
                            className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label
                        htmlFor="carRegistration"
                        className="text-sm font-medium leading-6 text-gray-900 flex justify-between items-center"
                    >
                        Vehicle Registration
                        <Link to={carRegistration} target="_blank" className="text-blue-500">View</Link>
                    </label>
                    <div className="mt-2">
                        <input
                            id="carRegistration"
                            name="carRegistration"
                            type="file"
                            required=""
                            onChange={(e) => setCarRegistration(e.target.files[0])}
                            className="block file:rounded-full file:border-none file:cursor-pointer w-full px-1.5 
                                rounded-sm cursor-pointer border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
                    >
                        Submit
                    </button>
                    <button
                        onClick={(e) => deleteCar(driverCar?.id, e)}
                        className="flex mt-1 w-full justify-center rounded-sm bg-red-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800"
                    >
                        Delete
                    </button>
                </div>
            </form>
            :
            <>
            <div
                className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 hover:bg-blue-950 hover:text-white"
                role="alert"
            >
                <p>
                You do not have any cars, Please add new one
                </p>
                
            </div>
            <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-sm bg-black px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black/80"
                    >
                        Add a car
                    </button>
                </div>
            </>
            
            }
        </>
    )
}



export default CarInfo