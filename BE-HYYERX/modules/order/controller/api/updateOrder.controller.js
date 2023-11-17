import catchAsync from "../../../../utils/catchAsync.js";
import { updateOrders } from "../../service/order.service.js";
import status from 'http-status';

const updateOrder = catchAsync(async (req, res) => {
    await updateOrders(req)
    return res.status(status.OK).json(`đã chuyển đổi trạng thái thành ${req.body.orderStatus}`)
})

export default updateOrder