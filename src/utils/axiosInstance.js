import axios from 'axios'
import { logout } from '../redux/slice/UserSlice'
const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL,
    withCredentials:true,
    timeout:10000
})

axiosInstance.interceptors.response.use((response)=>response,
(error)=>{
    if(error.response?.status===401){
        Store.dispatch(logout());
        window.location.href='/login'
    }
    return Promise.reject(error)
}
)
export default axiosInstance