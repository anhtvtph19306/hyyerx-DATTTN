import express from "express"
import { veryFileToken } from "../middlewares/checkAuthorization.js"
import cartController from "../modules/cart/controller/index.js"

const router = express.Router()
router.use(veryFileToken)
router.get('/', cartController.getAllProductToCart)
router.post('/add', cartController.addProductToCart)
router.delete('/:productId', cartController.deleteProductCart)
router.post('/update', cartController.updateProductCart)
export default router