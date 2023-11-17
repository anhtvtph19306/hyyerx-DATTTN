import catchAsync from "../../../../utils/catchAsync.js";
import { getOneCategorys } from "../../service/category.service.js";
import status from 'http-status'

const getOneCategory = catchAsync(async(req, res)=>{
    const category = await getOneCategorys(req)
    return res.status(status.OK).json(category)
})

export default getOneCategory