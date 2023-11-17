import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { deleteUsers } from "../../service/auth.service.js";

const deleteUser = catchAsync(async (req, res) => {
    const user = await deleteUsers(req)
    return res.status(status.OK).json(user)
})

export default deleteUser