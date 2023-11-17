import { confisAxios } from "../config-http"


export const createContact = async (data: any) => {
    return await confisAxios.post("/contact/add", data)
}

export const seenContact = async (data: any) => {
    return await confisAxios.post('/contact/seencontact', data)
}