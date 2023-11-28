import driverImg from "../../assets/images/Hero/dr.jpg";

const Driver = () => {
    return (
        <section className="w-[90%]
        mx-auto mt-10 flex flex-col-reverse gap-3
        md:gap-0 md:flex-row">
            <div className="w-full h-[400px] mr-6 md:mr-12 md:max-w-[40%] md:h-[600px]">
                <img src={driverImg} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 md:py-32 px-2">
                <div>
                    <h3 className="font-semibold text-center md:text-start text-3xl md:text-2xl mb-8 mt-4">Join Our Driver Community</h3>
                    <p className="text-sm md:text-xl text-slate-500">
                    Become a part of our driving team and enjoy the benefits of flexible schedules, competitive earnings, and a supportive community. 
                    <br />
                    Join us in delivering safe and reliable 
                    transportation services to our passengers while  driving your career forward.
                    </p>
                    <ul className="flex justify-around items-center w-full mt-12">
                    <li><span className="font-bold text-2xl sm:text-4xl text-teal">200</span>
                        <p className="text-slate-500 text-sm sm:text-base">Requests a day</p>
                    </li>
                    <li><span className="font-bold text-2xl sm:text-4xl text-teal">Up to 2x</span>
                        <p className="text-slate-500 text-center text-sm sm:text-base">Surge value</p>
                    </li>
                    <li><span className="font-bold text-2xl sm:text-4xl text-teal">Up to $500</span>
                        <p className="text-slate-500 text-sm sm:text-base text-center">Weekly bonus</p>
                    </li>
                </ul>
                </div>
                
            </div>
        </section>
    )
}

export default Driver