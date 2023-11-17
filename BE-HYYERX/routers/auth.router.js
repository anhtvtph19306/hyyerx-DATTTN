import express from "express"
import authController from "../modules/auth/controller/index.js"

const router = express.Router()
router.get('/search', authController.searchAuth)
router.get("/", authController.getAllUser)
router.get('/user-detail', authController.getUserDetail)
router.post("/register", authController.register)
router.post("/login", authController.login)
router.delete("/:id", authController.deleteUser)
router.put("/:id", authController.updateUser)
router.post('/forgotpassword', authController.forgotPassword)
export default router