import { Routes, Route } from "react-router-dom";
import {AccountVerification, DriverInfo, 
  Home, Login, RidesPage, RiderAccountInfo,  Signup, BookRide, BookedRides} from "./routes/paths";
import { ApiMsg, Header } from "./components/index";
import RequireAuth, { DriverPermitted, NonAuthenticatedOrRedirect, RiderPermitted } from "./permissions/requireAuth";
import Layout from "./permissions/Layout";

function App() {

  return (

    <>
    {/* hide NavBar if path is Auth */}
    <Header /> 
    <ApiMsg />
    <Routes>
      <Route path="/" exact element={<Home />} />

      {/* Auth */}
      <Route element={<NonAuthenticatedOrRedirect />}>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      </Route>
      <Route element={<Layout />}>
      <Route  element={<RequireAuth />} >


      <Route element={<DriverPermitted />} >
      {/* Drivers */}
      <Route path="/driver/account" element={<AccountVerification />} />
      <Route path="/driver/main" element={<RidesPage />} />
      <Route path="/driver/:id" element={<DriverInfo />} />
      </Route>
      
      {/* Riders */}
      <Route element={<RiderPermitted />} >

      <Route path="/rider/:id" element={<RiderAccountInfo />} />
      <Route path="/rider/book" element={<BookRide />} />
      <Route path="/rider/bookings" element={<BookedRides />} />

      </Route>
      </Route>
      </Route>
    </Routes>
    
    </>
  )
}

export default App
