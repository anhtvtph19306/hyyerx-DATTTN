import { confisAxios } from "~/app/api/config-http"

export const getAllContact = async () => {
    return await confisAxios.get('/contact')
}
export const deleteContact = async (id: any) => {
    return await confisAxios.delete('/contact/delete/' + id)
}
export const createContact = async (bodyRequest: any) => {
    return await confisAxios.post('/contact/add', bodyRequest)
}

export const updateContact = async (contactId: any, data: any) => {
    return await confisAxios.put('/contact/update/' + contactId, data)
}
export const searchContact = async (data: any) => {
    return await confisAxios.get(`/contact/search?email=${data}`)
}