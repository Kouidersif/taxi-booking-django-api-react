import { useState } from "react"


const SavedAdresses = ({riderSavedAdresses, deleteAddress, createNewAddress}) => {
    const [ address, setAddress ] = useState(" ")

    const handleCreation = (e) =>{
        e.preventDefault()
        createNewAddress(address)
        setAddress("")
    }

    return (
        <>
            <form className="space-y-6" onSubmit={handleCreation}>
                <div>
                    <label
                        htmlFor="savedAddress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Add new address
                    </label>
                    <div className="mt-2">
                        <input
                            id="savedAddress"
                            name="savedAddress"
                            type="text"
                            value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                            placeholder="505 E 70 ST, NEW YORK, NY, 10021"
                            required=""
                            className="block w-full px-1.5 rounded-sm border-2 py-2 file:bg-teal file:text-white sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <h2 className="font-semibold">Saved addresses</h2>
                <ul className="w-full text-sm font-medium text-gray-900 border-gray-200">
                    {   
                    riderSavedAdresses?.length ?
                        riderSavedAdresses?.map((address)=>(
                            <li key={address.id} className="w-full flex justify-between items-center px-4 py-2 hover:bg-slate-100 border-b border-gray-200">
                            {address?.address}
                            <span className="text-red-500 font-semibold 
                            cursor-pointer text-md" onClick={()=> deleteAddress(address?.id)}>Delete</span>
                            </li>
                        ))
                    :
                    <li className="w-full px-4 py-2 hover:bg-slate-100 cursor-pointer border-b border-gray-200">
                            You have no address yet...
                    </li>
                    }
                
                </ul>
                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-sm bg-deep-purple px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            

        </>


    )
}

export default SavedAdresses;