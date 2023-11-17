import status from 'http-status';
import jwt from 'jsonwebtoken';
import authModel from '../modules/auth/model/auth.model.js';

const veryFileToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const accessToken = token.split(" ")[1]
        if (!token) {
            return res.status(status.BAD_REQUEST).json("bạn chưa đăng nhập tài khoản")
        }

        const verifyToken = await jwt.verify(accessToken, process.env.SECRET_KEY)
        if (!verifyToken) {
            return res.status(status.BAD_REQUEST).json("lỗi token không hợp lệ")
        }
        const user = await authModel.findOne({ _id: verifyToken._id })
        req.user = user //gán tài khoản đăng nhập nhập vào req.user   
        next() // nếu thành công với cho đi tiếp


    } catch (error) {
        return res.status(status.BAD_REQUEST).json("error")
    }
}

const checkRoleAdminAuthorization = (req, res, next) => {
    veryFileToken(req, res, () => {
        if (req.user.role == "ADMIN") {
            next()
        }
        else {
            return res.status(status.BAD_REQUEST).json("lỗi role")
        }
    })
}

export { veryFileToken, checkRoleAdminAuthorization }

