import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status';
import authModel from "../../model/auth.model.js";
import { registers } from "../../service/auth.service.js";

const register = catchAsync(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(status.BAD_REQUEST).json("bạn chưa nhập đầy đủ thông tin")
    }

    const checkEmail = await authModel.findOne({ email: email })
    if (checkEmail) {
        return res.status(status.BAD_REQUEST).json("email đã tồn tải")
    }

    const user = await registers(req.body)
    return res.status(status.OK).json(user)
})

export default register