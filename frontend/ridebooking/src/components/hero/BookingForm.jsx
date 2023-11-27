import { useState } from "react";
import sedanSVG from "../../assets/svgs/sedan-11.svg";
import suvSVG from "../../assets/svgs/suv.svg";
import luxuryCar from "../../assets/svgs/luxury.svg";




const BookingForm = () => {
    const [formStep, setFormStep] = useState(1)

    const handleClick = (e) => {
        e.preventDefault()
        setFormStep(2)
    }

    return (
        <form className="flex border-2 flex-col gap-3 w-[90%] lg:w-[80%] mx-auto md:mx-0 md:ml-auto mt-12 md:mt-2 mb-2 shadow-lg p-4 rounded-sm">
            <h2 className="text-center text-xl font-semibold">Book your ride</h2>
            <p className="text-center text-slate-500 hover:text-blue-600">Few seconds and get your ride <br /> booked</p>

            {formStep === 1 ?
                <>
                    <div className="form-row">
                        <label htmlFor="">Full Name</label>
                        <input type="text" placeholder="Full Name" className="w-full py-3 rounded-sm px-1 border-2 text-md mt-2" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Phone Number</label>
                        <input type="tel" maxLength={10} placeholder="Phone Number" className="w-full py-3 rounded-sm px-1 border-2 text-md mt-2" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Addresses</label>
                        <input type="text" placeholder="pick-up address" className="w-full py-3 rounded-sm px-1 border-2 text-md mb-2 mt-2" />
                        <input type="text" placeholder="drop-off address" className="w-full py-3 rounded-sm px-1 border-2 text-md" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="">Email Address</label>
                        <input type="email" placeholder="Email" className="w-full py-3 rounded-sm px-1 border-2 text-md mt-2" />
                    </div>
                    <button onClick={handleClick} className="w-full bg-deep-purple py-3 rounded-sm text-white text-md">
                        Next {" "}{">"}
                    </button>
                </>
                :
                <>
                    <h3 className="text-center font-semibold text-2xl mb-4 mt-auto">Please choose car type</h3>
                    <div className="flex gap-4 justify-center mb-3 w-full">
                        <label htmlFor="sedanCar" className="cursor-pointer w-full">
                            <div className="flex flex-col relative hover:shadow-2xl border-2 hover:shadow-deep-purple/50 py-2 rounded-md">
                                <input type="radio" name="carCategory" id="sedanCar"
                                placeholder="Full Name" className="absolute left-2 top-2" />
                                <img src={sedanSVG} alt="sedan" className="w-[48px] mx-auto h-[48px]" />
                                <span className="mt-auto text-center">Sedan</span>
                            </div>
                        </label>
                        <label htmlFor="suvCar" className="cursor-pointer w-full">
                            <div className="flex flex-col relative hover:shadow-2xl border-2 hover:shadow-deep-purple/50 py-2 rounded-md">
                                <input type="radio" name="carCategory" id="suvCar"
                                placeholder="Full Name" className="absolute left-2 top-2" />
                                <img src={suvSVG} alt="sedan" className="w-[48px] mx-auto h-[48px]" />
                                <span className="mt-auto text-center">SUV</span>
                            </div>
                        </label>
                        <label htmlFor="luxuryCar" className="cursor-pointer w-full">
                            <div className="flex flex-col relative hover:shadow-2xl border-2 hover:shadow-deep-purple/50 py-2 rounded-md ">
                                <input type="radio" name="carCategory"  id="luxuryCar"
                                placeholder="Full Name" className="absolute left-2 top-2" />
                                <img src={luxuryCar} alt="sedan" className="w-[48px] mx-auto h-[48px]" />
                                <span className="mt-auto text-center">Luxury</span>
                            </div>
                        </label>

                    </div>

                    <div className="flex gap-2 mt-auto">
                    <button onClick={()=> setFormStep(1)} className="w-full py-3 rounded-sm border-deep-purple 
                    border-2 text-deep-purple text-md hover:text-white hover:bg-deep-purple">
                    {"<"} {" "} back
                    </button>
                    <button className="w-full bg-deep-purple py-3 rounded-sm text-white text-md">
                        Submit
                    </button>
                    </div>
                </>
            }


        </form>
    )
}

export default BookingForm