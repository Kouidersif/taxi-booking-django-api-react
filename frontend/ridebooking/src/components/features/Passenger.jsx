import suiteCase from "../../assets/images/featurepax/suitecase.jpg";
import clockImg from "../../assets/svgs/clock.png";
import comfortImg from "../../assets/svgs/thumb-ups.png";
import safetyImg from "../../assets/svgs/shield.png";


const Passenger = () => {
    return (
        <section className="w-[90%]
        mx-auto mt-10 flex flex-col-reverse gap-3
        md:gap-0 md:flex-row-reverse">
            <div className="w-full h-[300px] mr-6 md:mr-12 md:max-w-[40%] md:h-[600px]">
                <img src={suiteCase} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 md:py-32 px-2">
                <div>
                    <h3 className="font-semibold text-center md:text-start 
                    text-3xl md:text-2xl mb-8 mt-4">Travel with Confidence</h3>
                    <p className="text-sm md:text-xl text-slate-500">
                    Experience a seamless journey with our transportation service. 
                    Enjoy safe and reliable rides while our dedicated drivers take you 
                    to your destination. <br /> Your comfort 
                    and satisfaction are our top priorities as we navigate the road to your destination.
                    </p>
                    <ul className="flex justify-around items-center w-full mt-12">
                    <li><span className="flex justify-center mb-4">
                        <img src={safetyImg} alt="" className="w-[48px] h-[48px]" />
                    </span>
                        <p className="text-slate-500 text-sm sm:text-base">Safety first</p>
                    </li>
                    <li><span className="flex justify-center mb-4">
                    <img src={comfortImg} alt="" className="w-[48px] h-[48px]" />
                    </span>
                        <p className="text-slate-500 text-center text-sm sm:text-base">Comfortable Travel</p>
                    </li>
                    <li><span className="flex justify-center mb-4">
                    <img src={clockImg} alt="" className="w-[48px] h-[48px]" />
                    </span>
                        <p className="text-slate-500 text-sm sm:text-base text-center">On-Time Arrival</p>
                    </li>
                </ul>
                </div>
                
            </div>
        </section>
    )
}

export default Passenger