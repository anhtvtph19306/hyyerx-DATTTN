import register from './api/register.controller.js';
import login from './api/login.controller.js';
import getAllUser from './api/getAllUser.controller.js';
import deleteUser from './api/deleteUser.controller.js';
import updateUser from './api/updateUser.controller.js';
import searchAuth from './api/searchAuth.controller.js';
import getUserDetail from './api/get-user-detail.controller.js';
import forgotPassword from './api/forgotPassword.controller.js';

const authController = {
    register,
    login,
    getAllUser,
    deleteUser,
    updateUser,
    searchAuth,
    getUserDetail,
    forgotPassword
}

export default authController