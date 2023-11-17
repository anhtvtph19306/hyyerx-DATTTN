import express from 'express'
import { checkRoleAdminAuthorization, veryFileToken } from '../middlewares/checkAuthorization.js'
import vorcherController from '../modules/vorcher/controller/index.js'

const router = express.Router()
router.use(veryFileToken)
router.get("/", vorcherController.getAllVorcher)
router.get("/search", vorcherController.searchVouchers)
router.use(checkRoleAdminAuthorization)
router.post("/add", vorcherController.createVorcher)
router.delete("/delete/:id", vorcherController.deleteVorcher)
router.put('/update/:id', vorcherController.updateVorcher)

export default router 