import { useNavigate } from 'react-router-dom'
import useGetContext from '../context/useGetContext'
import { axiosInstancePublic } from './AxiosSettings'

const useRefreshToken = () => {
    const { userToken, setUserToken, setErrorAPI } = useGetContext()
    const navigate = useNavigate()

    const refreshTheToken = async () => {
        try {
            const response = await axiosInstancePublic.post(`api/token/refresh/`, {
                refresh: userToken.refresh
            })
            setUserToken({
                ...userToken, refresh: response?.data?.refresh, access: response?.data?.access
            })
            localStorage.clear()
            localStorage.setItem("access_token", JSON.stringify(response.data.access))
            localStorage.setItem("refresh_token", JSON.stringify(response.data.refresh))

        } catch (err) {
            console.log(err)
        }
    }

    return refreshTheToken;
}

export default useRefreshToken;