import status from 'http-status'
import catchAsync from '../../../../utils/catchAsync.js';
import { searchVoucher } from '../../service/vorcher.service.js';
const searchVouchers = catchAsync(async (req, res) => {
    const search = await searchVoucher(req)
    if (search.length === 0) {
        return res.status(status.NOT_FOUND).json("Không có voucher nào phù hợp với từ khóa tìm kiếm")
    }
    else return res.status(status.OK).json(search);


})
export default searchVouchers