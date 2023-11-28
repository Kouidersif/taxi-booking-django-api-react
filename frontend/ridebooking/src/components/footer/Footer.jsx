

const Footer = () => {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 mt-14 border-t-2">
            <div className="mx-auto max-w-screen-xl text-center">
                <a
                    href="#"
                    className="flex justify-center items-center text-2xl font-semibold"
                >
                    <h1 className="text-2xl font-bold text-mid-night-blue flex items-center gap-2">
                    <div className="w-[20px] h-[20px] inline-block bg-mid-night-blue rounded-full"></div> 
                    CARCAR</h1>
                </a>
                <p className="my-6 text-gray-500 ">
                    Transportation provider, make your life easier with few clicks
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 ">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Premium
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">
                            Campaigns
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Blog
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Affiliate Program
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            FAQs
                        </a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">
                            Contact
                        </a>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center flex justify-center items-center">
                CarCar
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer