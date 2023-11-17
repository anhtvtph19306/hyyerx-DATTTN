import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status';
import { getUserDetails } from './../../service/auth.service.js';


const getUserDetail = catchAsync(async (req, res) => {
    const user = await getUserDetails(req.query)

    return res.status(status.OK).json(user)
})
export default getUserDetail