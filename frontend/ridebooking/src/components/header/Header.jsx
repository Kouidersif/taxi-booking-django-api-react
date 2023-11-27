import { useState } from "react"
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import useLogout from "../../routes/auth/authook/useLogout";
import useGetContext from "../../../context/useGetContext";
import ProfileDropDown from "./ProfileDropDown";




const Header = () => {
    const [toggleNav, setToggleNav] = useState(false);
    const { logoutFunc } = useLogout()
    const { userToken } = useGetContext()

    const linkObj = {
        signupLink: "/sign-up",
        homeLink: "/",
        loginLink: "/login",
    }



    return (
        <header className="w-full h-[3.5rem] sticky z-50 top-0 bg-white">
            <nav className="w-[90%] h-full mx-auto flex justify-between items-center relative">
                <div>
                    <Link to={linkObj.homeLink}>
                        <h1 className="text-2xl font-bold text-mid-night-blue flex items-center gap-2">
                            <div className="w-[20px] h-[20px] bg-mid-night-blue rounded-full"></div>
                            CARCAR</h1>
                    </Link>
                </div>
                <ul className={`items-center h-full gap-4 ${!userToken?.access ? "hidden md:flex" : "flex"}`}>
                    {
                        !userToken?.access &&
                    <>
                    <li><Link to={linkObj.homeLink} className="cursor-pointer">Learn more</Link></li>
                    <li><Link to={linkObj.signupLink} className="text-steel-blue cursor-pointer border-2 border-steel-blue 
                py-3 px-4 text-sm lg:text-md
                hover:text-white hover:bg-steel-blue">Earn money as Driver</Link>
                    </li>
                    </>
                    }
                    <li>
                        {
                            userToken?.access ? 
                            <ProfileDropDown logoutFunc={logoutFunc} />
                            :
                            <Link to={linkObj.loginLink} className="text-white cursor-pointer 
                            bg-deep-purple text-sm lg:text-base py-3 px-4">
                                    Login
                            </Link>
                        }
                    </li>
                </ul>
                {
                    !userToken?.access &&
                    <MobileNav toggleNav={toggleNav}
                    setToggleNav={setToggleNav} logOutUser={logoutFunc} linkObj={linkObj} />
                }

            </nav>
        </header>
    )
}

export default Header