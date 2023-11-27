import { useEffect, useState } from 'react'
import useAxios from '../../../../api/useAxios'
import { useParams } from 'react-router-dom'

const useFetchRiderProfile = () => {
    const { id } = useParams()
    const [ riderProfile, setRiderProfile ] = useState(null)
    const api = useAxios()

    const fetchRiderProfileData  = async ()=>{
        try{
            const response = await api.get(`riders/${id}/`);
            setRiderProfile(response?.data)
        }catch(err){
            console.log("response Error", err)
        }
    }
    const updateRiderProfileData  = async (formData)=>{
        try{
            console.log(formData)
            const response = await api.put(`riders/${id}/`, 
                formData
            );
        }catch(err){
            console.log("response Error", err)
        }
    }

    useEffect(()=>{
        fetchRiderProfileData()
    }, [])


    return { riderProfile, updateRiderProfileData }
}

export default useFetchRiderProfile