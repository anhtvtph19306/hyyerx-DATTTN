import { confisAxios } from "~/app/api/config-http"

export const createVocher = async (bodyRequest: any) => {
    return await confisAxios.post('/vorcher/add', bodyRequest)
}

export const deleteVorcher = async (dataId: any) => {
    return await confisAxios.delete(`/vorcher/delete/${dataId}`)
}

export const changeVorcher = async (dataId: any, bodyRequest: any) => {
    return await confisAxios.put(`/vorcher/update/${dataId}`, bodyRequest)
}


export const searchVorcher = async (code: any) => {
    return await confisAxios.get(`/vorcher/search?code=${code}`)
}

export const getAllVorcher = async () => {
    return await confisAxios.get("/vorcher")
}


