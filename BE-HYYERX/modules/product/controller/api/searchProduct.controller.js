import { searchProducts } from '../../service/product.service.js';
import catchAsync from './../../../../utils/catchAsync.js';
import status from 'http-status';

const searchProduct = catchAsync(async (req, res) => {
    const dataSearch = await searchProducts(req)
    if (dataSearch.length == 0) {
        return res.status(status.BAD_REQUEST).json("không có từ khoá tìm kiếm")
    }

    return res.status(status.OK).json(dataSearch)
})
export default searchProduct