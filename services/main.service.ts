import axios from "axios";
import { config } from "../config/main.config";
import { ConfigInterface } from "../interfaces/config.interface";

const axiosInstance = axios.create({ baseURL: config.baseUrl })

const getConfig = async () => {
    try {
        const { data } = await axiosInstance.get('/config')
        return data
    } catch (error) {
        console.log(error)
    }

}

const registerDeviceNotificationToken = async (token: string) => {
    try {
        const respose = await axiosInstance.post('/register/notification/token', { token })
    } catch (error) {
        console.log(error)
    }
}


const updateConfiguration = async (config:any) => {
    try {
        const { data } = await axiosInstance.post('/config', config)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const mainService = { getConfig, registerDeviceNotificationToken, updateConfiguration }