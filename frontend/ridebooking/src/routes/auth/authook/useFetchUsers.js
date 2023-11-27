import { useEffect, useState } from 'react'
import useGetContext from '../../../../context/useGetContext';
import useAxios from '../../../../api/useAxios';

const useFetchUsers = () => {
    const [ userInfo, setUserInfo ] = useState("");
    const { userDecodedToken, loading, setLoading, setErrorAPI, setSuccessMsgAPI } = useGetContext();
    const api = useAxios();

    const fetchUser = async () =>{
        try{
            setLoading(true)
            const response = await api.get(`auth/${userDecodedToken?.userID}/`)
            setUserInfo(response?.data)

        }catch(err){
            setErrorAPI("something went wrong ")
        }finally{
            setLoading(false)
        }
    }
    const updateUserAccount = async (formData) =>{
        try{
            setLoading(true)
            const response = await api.put(`auth/${userDecodedToken?.userID}/`, formData)
            setUserInfo(response?.data)
            setSuccessMsgAPI("Data updated with success")

        }catch(err){
            setErrorAPI("something went wrong ")
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    }, [])

    return { userInfo, updateUserAccount }
}

export default useFetchUsers