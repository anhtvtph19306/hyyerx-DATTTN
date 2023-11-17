import { confisAxios } from "../config-http"

export const getAllContent = async () => {
    const response = await confisAxios.get("/content")
    return response.data
}
