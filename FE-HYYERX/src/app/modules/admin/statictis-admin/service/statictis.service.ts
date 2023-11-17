import { confisAxios } from "~/app/api/config-http"

export const getAllOrder = async () => {
    return await confisAxios.get('/order/')
}

export const getAllOrderByStatus = async (data: any) => {
    return await confisAxios.post('/statistics/order-all-status', data)
}