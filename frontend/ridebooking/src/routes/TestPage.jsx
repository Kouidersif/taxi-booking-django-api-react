import Map, { Marker } from 'react-map-gl';




const TestPage = () => {
    return (
        <div className=''>
            <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
            initialViewState={{
                longitude: -73.977785,
                latitude: 40.63258,
                zoom: 8.5
            }}
            style={{width:"100vw", height:"100vh"}}
            mapStyle="mapbox://styles/mapbox/streets-v12"

        // style: 'mapbox://styles/mapbox/streets-v12',
        >
            {/* <Marker longitude={rideCoordinates.pickupLong} latitude={rideCoordinates.pickupLat} anchor="bottom" >
                        <div className="w-[25px] h-[25px] rounded-full bg-blue-900" />
                        </Marker>
                        <Marker longitude={rideCoordinates.dropOffLong} latitude={rideCoordinates.dropOffLat} anchor="bottom" >
                        <div className="w-[25px] h-[25px] rounded-full bg-red-900" />
                        </Marker> */}
        </Map>
        </div>
    )
}

export default TestPage;