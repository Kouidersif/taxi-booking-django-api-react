import { useEffect, useState } from "react"
import useAxios from "../../../../api/useAxios.js";
import axios from "axios";



const useBookRide = () => {
    const [ loadingState, setLoadingState ] = useState(false)
    const api = useAxios()
    const [ siteSettings, setSiteSettings] = useState({})
    const [ rideDetails, setRideDetails] = useState({
        rideDistance:0,
        rideDuration:0,
        ridePrice: 0,
    })

    const getCoordinates = async (address) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_MAPBOX_URL_ENDPOINT}/geocoding/v5/mapbox.places/${address}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}&autocomplete=true`
            );
            // Extract latitude and longitude from the response
            const [longitude, latitude] = response.data && response.data.features[0].center;
            return { latitude, longitude };
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            return null;
        }
    };

    const getSiteSettings = async () => {
        try {
            const response = await api.get("app/site/")
            setSiteSettings(response?.data[0])
        } catch (err) {
            console.log(err)

        }
    }
    
    const startRideBooking = async (pickUpAddress, destinationAddress) =>{
        setLoadingState(true)
        const pickUp = await getCoordinates(pickUpAddress)
        const dropOff = await getCoordinates(destinationAddress)
        const responseRoute = await axios.get(`${import.meta.env.VITE_MAPBOX_URL_ENDPOINT}/directions/v5/mapbox/driving/${pickUp.longitude},${pickUp.latitude};${dropOff.longitude},${dropOff.latitude}?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`);
        const rideDuration = responseRoute?.data?.routes[0]?.duration / 60 ; // Get duration and calculate it in minutes 
        const rideDistance = responseRoute?.data?.routes[0]?.distance / 1000; // Get Distance and calculate in kms
        // Start calculating ride price to show to user :
        // # Calculate price for duration
        const durationValue = siteSettings?.price_minute * rideDuration
        const distanceValue = siteSettings?.price_km * rideDistance
        const totalPrice = Number(siteSettings?.base_price) + durationValue + distanceValue
        setRideDetails(
            {
                ...rideDetails,
                rideDistance:rideDistance.toFixed(2),
                rideDuration:rideDuration.toFixed(2),
                ridePrice: totalPrice.toFixed(2),
                pickUp_long_lat: `${pickUp.longitude}, ${pickUp.latitude}`,
                dropOff_long_lat: `${dropOff.longitude}, ${dropOff.latitude}`,
            }
        )


        setLoadingState(false)
        
    }

    useEffect(() => {
        getSiteSettings()
    }, [])

    return { getSiteSettings, loadingState , siteSettings, startRideBooking,rideDetails }
}

export default useBookRide