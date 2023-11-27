import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';




const MapComp = ({ rideObj }) => {
    
    const [ rideCoordinates,  setRideCoordinates ] = useState({
        pickupLong:0,
        pickupLat:0,
        dropOffLong:0,
        dropOffLat:0,
    })
    useEffect(() => {
        if (rideObj){
        const dropOffLangLat = rideObj?.drop_off_long_lat;
        const pickUpLangLat = rideObj?.pickup_long_lat;
        const pickUp = pickUpLangLat?.split(",");
        const dropOff = dropOffLangLat?.split(",");
        if (pickUp&&
            dropOff){
                setRideCoordinates(
                    {
                        ...rideCoordinates,
                        pickupLong:Number(pickUp[0]),
                        pickupLat:Number(pickUp[1]),
                        dropOffLong:Number(dropOff[0]),
                        dropOffLat:Number(dropOff[1]),
                        
                    }
                )
            }
        
        }
        

    }, [rideObj]);

    
    return (
        <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            initialViewState={{
                longitude: rideCoordinates.pickupLong || -73.977785,
                latitude: rideCoordinates.pickupLat || 40.63258,
                zoom: 8.5
            }}
            style={{ width: "100%", minHeight: "40rem" }}
            mapStyle="mapbox://styles/mapbox/streets-v12"

        >
            {
                rideObj?.ride_status != "In Progress" &&
                <Marker longitude={rideCoordinates.pickupLong} latitude={rideCoordinates.pickupLat} anchor="bottom" >
                <div className="w-[25px] h-[25px] rounded-full bg-blue-900" />
                </Marker>
            }
            
            <Marker longitude={rideCoordinates.dropOffLong} latitude={rideCoordinates.dropOffLat} anchor="bottom" >
                <div className="w-[25px] h-[25px] rounded-full bg-red-900" />
            </Marker>
        </Map>
    )
}

export default MapComp;