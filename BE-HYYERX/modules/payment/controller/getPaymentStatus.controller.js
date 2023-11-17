import catchAsync from "../../../utils/catchAsync.js";
import { checkPaymentStatus } from "../service/payment.service.js";


const getPaymentStatus = catchAsync(async (req, res) => {
    const dataResult = await checkPaymentStatus(req.body)
    let messageData = ""
    if (dataResult.success) {
        messageData = "bạn đã thanh toán thành công đơn hàng"
    }
    else {
        messageData = "bạn đã thanh toán thất bại"
    }
    res.send(`
    <script>
    toast.success('${messageData}')
    </script>
    `)
})

export default getPaymentStatus