import { Routes, Route } from "react-router-dom";
import {AccountVerification, DriverInfo, 
  Home, Login, RidesPage, RiderAccountInfo,  Signup, BookRide, BookedRides} from "./routes/paths";
import { ApiMsg, Header } from "./components/index";
import TestPage from "./routes/TestPage";



function App() {

  return (

    <>
    {/* hide NavBar if path is Auth */}
    <Header /> 
    <ApiMsg />
    <Routes>
      <Route path="/" exact element={<Home />} />
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      {/* Drivers */}
      <Route path="/driver/account" element={<AccountVerification />} />
      <Route path="/driver/main" element={<RidesPage />} />
      <Route path="/driver/:id" element={<DriverInfo />} />
      {/* Riders */}
      <Route path="/rider/:id" element={<RiderAccountInfo />} />
      <Route path="/rider/book" element={<BookRide />} />
      <Route path="/rider/bookings" element={<BookedRides />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
    
    </>
  )
}

export default App
