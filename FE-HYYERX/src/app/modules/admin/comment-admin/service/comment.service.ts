import { confisAxios } from "~/app/api/config-http"

export const getAllComment = async () => {
    return await confisAxios.get("/comment")
}

export const deleteComment = async (id: any) => {
    return await confisAxios.delete(`/comment/delete/${id}`)
}

export const updateComment = async (id: any, bodyRequest: any) => {
    return await confisAxios.put(`/comment/update/${id}`, bodyRequest)
}

export const searchComment = async (keyword: any) => {
    return await confisAxios.get(`/comment/search?name=${keyword}`)
}