import axios from "axios";

export const baseURL = "http://127.0.0.1:8000/"


export const axiosInstancePublic = axios.create({
    baseURL,
    
})  
const axiosInstancePrivate = axios.create({
    baseURL:baseURL,
})  


export default axiosInstancePrivate