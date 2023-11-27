import { useEffect, useState } from 'react'
import useAxios from '../../../../api/useAxios';

const useFetchAddresses = () => {

    const [riderSavedAdresses, setRiderSavedAdresses] = useState([]);
    const [obj, setObj] = useState()
    const api = useAxios()


    const createNewAddress = async (address) => {
        try {
            const response = await api.post("riders/create-address/", {
                address
            });
            setObj(response?.data)
        } catch (err) {
            console.log("error", err)
        }
    }

    const fetchAddress = async () => {
        try {
            const response = await api.get("riders/saved-addresses/");
            setRiderSavedAdresses(response?.data)
        } catch (err) {
            console.log("error", err)
        }
    }
    const deleteAddress = async (pk) => {
        try {
            const response = await api.delete(`riders/saved-addresses/${pk}`);
            setObj(response)
        } catch (err) {
            console.log("error", err)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [obj])

    return { riderSavedAdresses,createNewAddress,  deleteAddress }
}

export default useFetchAddresses