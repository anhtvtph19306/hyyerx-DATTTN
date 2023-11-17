import express from "express"

import contentController from "../modules/content/controller/index.js"
import { checkRoleAdminAuthorization, veryFileToken } from "../middlewares/checkAuthorization.js"

const router = express.Router()
router.get('/search', contentController.searchContent)
router.get('/', contentController.getAllContents)

router.use(veryFileToken)
router.use(checkRoleAdminAuthorization)
router.post('/add', contentController.createContent)
router.delete('/delete/:id', contentController.deleteContent)
router.put('/update/:id', contentController.updateContents)
export default router