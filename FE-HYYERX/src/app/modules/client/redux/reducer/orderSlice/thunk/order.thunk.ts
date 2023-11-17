import { createAsyncThunk } from "@reduxjs/toolkit"
import { confisAxios } from "~/app/api/config-http"

export const getAllOrders = createAsyncThunk("category/getallcategory", async () => {
    const response = await confisAxios.get("/order")
    return response.data
})
