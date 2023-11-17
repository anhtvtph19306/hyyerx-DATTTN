import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status';
import { getAllOrders } from "../../service/order.service.js";

const getAllOrder = catchAsync(async (req, res) => {
    const order = await getAllOrders(req)
    return res.status(status.OK).json(order)
})

export default getAllOrder