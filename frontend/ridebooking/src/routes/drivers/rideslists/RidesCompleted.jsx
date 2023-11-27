


const RidesCompleted = ({finishedRides}) => {
    return (
        <ul className="w-full shadow-xl border-2 border-blue-500 overflow-y-auto overflow-x-hidden max-h-[600px]">
            {
                finishedRides?.length ?
                    finishedRides?.map((ride) => (
                        <li key={ride?.id} className="flex text-xs sm:text-base py-1 justify-between px-3 sm:mb-2 sm:py-2 cursor-pointer hover:bg-slate-200">
                            <span className="font-semibold text-stone-400">#{ride?.id}</span>
                            <span className="font-semibold">{ride?.rider?.email || "Rider"}</span>
                            <span className="font-semibold">{ride?.pick_up_location.substring(0, 10)}</span>
                            <span className="font-semibold">{ride?.drop_off_location.substring(0, 10)}</span>
                            <span className="text-green-600">${ride?.ride_price}</span>
                            <span className="text-blue-500">{ride?.ride_status}</span>
                        </li>
                    )) :
                    <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                        <span className="font-medium">Info alert!</span> You have not completed any rides yet...
                    </div>
            }


        </ul>
    )
}

export default RidesCompleted