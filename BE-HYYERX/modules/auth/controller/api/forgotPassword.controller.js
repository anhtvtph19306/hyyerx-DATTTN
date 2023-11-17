import catchAsync from "../../../../utils/catchAsync.js"
import status from 'http-status'
import { forgotPasswords } from "../../service/auth.service.js"
import authModel from "../../model/auth.model.js"
const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body
    const checkEmail = await authModel.findOne({ email: email })
    if (!email) {
        return res.status(status.BAD_REQUEST).json('Vui lòng nhập đầy đủ thông tin')
    }
    if (!checkEmail) {
        return res.status(status.BAD_REQUEST).json('Email không tồn tại trong hệ thống')
    }
    try {
        const { email } = req.body
        if (email) {
            const reponse = await forgotPasswords(email)
            return res.status(status.OK).json(reponse)
        }
        return req.json({
            status: 'error',
            message: 'The email is required'
        })
    } catch (err) {
        console.log("TRANSPORTER ERROR MESSAGE: " + err.message);
    }
})
export default forgotPassword