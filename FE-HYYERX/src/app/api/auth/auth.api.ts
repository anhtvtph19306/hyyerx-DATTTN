import { confisAxios } from "../config-http"

export const register = async (user: any) => {
    const response = await confisAxios.post("/auth/register", user)
    return response.data
}

export const login = async (user: any) => {
    const response = await confisAxios.post("/auth/login", user)
    return response.data
}

export const getUserDetail = async (id: any) => {
    return await confisAxios.get(`/auth/user-detail?userId=${id}`)
}

export const forgotPassword = async (email: any) => {
    return await confisAxios.post(`/auth/forgotpassword`, email)
}