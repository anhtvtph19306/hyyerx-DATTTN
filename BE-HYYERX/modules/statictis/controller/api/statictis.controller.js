import catchAsync from "./../../../../utils/catchAsync.js";
import { getStatistics } from "../../service/statictis.service.js";
import status from 'http-status';

const statisticsProduct = catchAsync(async (req, res) => {
    const products = await getStatistics()
    return res.status(status.OK).json(products)
})
export default statisticsProduct