import catchAsync from "./../../../../utils/catchAsync.js";
import status from "http-status"
import { statisticsMonneys } from "../../service/statictis.service.js";

const statisticsMoney = catchAsync(async (req, res) => {
    const monney = await statisticsMonneys(req.body)
    return res.status(status.OK).json(monney)
})
export default statisticsMoney