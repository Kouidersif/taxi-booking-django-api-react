import HeroImg from "../../assets/images/Hero/hero-app.jpg";


const Hero = () => {
    return (
        <section className="w-[90%] mx-auto flex flex-col md:flex-row gap-4 mt-10 py-6 ">
            <div className="w-full text-center md:text-start md:w-[55%]">
                <div className="typo">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold">
                            Book Your Next Ride <br /> easier with our {" "}
                            <span className="text-teal font-extrabold">Easy to go App</span>
                        </h1>

                    </div>
                    <p className="mt-12 text-xl font-base text-slate-500 
                    first-letter:text-black 
                    first-letter:font-bold first-letter:text-6xl">
                        Booking your next ride has never been more convenient than with our
                        user-friendly Easy to Go App. Whether you are traveling Lorem ipsum dolor
                        sit amet consectetur adipisicing elit. Dolorem, veritatis! for work or leisure, our app simplifies the process, making it hassle-free and efficient.
                    </p>
                </div>
                <ul className="flex justify-between items-center w-full mt-12">
                    <li><span className="font-bold text-4xl text-teal">3000</span>
                        <p className="text-slate-500">Completed rides</p>
                    </li>
                    <li><span className="font-bold text-4xl text-teal">4500</span>
                        <p className="text-slate-500">Active Drivers</p>
                    </li>
                    <li><span className="font-bold text-4xl text-teal">300</span>
                        <p className="text-slate-500">Loyal Clients</p>
                    </li>
                </ul>
            </div>
            <div className="flex-1 min-h-full">
                <img src={HeroImg} alt="" />
            </div>

        </section>
    )
}

export default Hero