import express from 'express'
import statisticsController from '../modules/statictis/controller/index.js'

const router = express.Router()
router.get("/", statisticsController.statisticsProduct)
router.post('/order-all-status', statisticsController.statisticsMoney)

export default router 