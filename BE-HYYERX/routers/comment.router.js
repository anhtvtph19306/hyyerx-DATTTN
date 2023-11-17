import express from "express"
import { veryFileToken } from "../middlewares/checkAuthorization.js"
import commnetController from "../modules/comment/controller/index.js"

const router = express.Router()
router.get('/search', commnetController.searchComment)
router.get('/:productId', commnetController.getComment)
router.get('/getone/:id', commnetController.getOneComment)
// router.use(veryFileToken)
router.post('/add', commnetController.createComment)
router.get('/', commnetController.getAllComment)
router.delete('/delete/:id', commnetController.deleteComment)
router.put('/update/:id', commnetController.updateComment)

export default router