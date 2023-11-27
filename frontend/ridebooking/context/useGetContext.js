import { useContext } from 'react';
import AppContext from "./useAppContext"

const useGetContext = () => {
    
    return useContext(AppContext)
}

export default useGetContext