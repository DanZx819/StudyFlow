import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8000/api",

});

api.interceptors.request.use((config) =>{
    //If para verificar se o app Next está só do lado do cliente
    if(typeof window !== "undefined"){ 
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config;
})

export default api;
