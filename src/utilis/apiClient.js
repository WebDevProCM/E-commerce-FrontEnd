import axios from "axios";


const apiClient = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN,
    headers: {"Content-Type": "application/json"},
    withCredentials: true
})

export default apiClient;