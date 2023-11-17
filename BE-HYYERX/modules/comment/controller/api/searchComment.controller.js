import { searchComments } from '../../service/comment.service.js';
import catchAsync from './../../../../utils/catchAsync.js';
import status from 'http-status';

const searchComment = catchAsync(async (req, res) => {
    const dataSearch = await searchComments(req)
    if (dataSearch.length == 0) {
        return res.status(status.BAD_REQUEST).json("không có từ khoá tìm kiếm")
    }

    return res.status(status.OK).json(dataSearch)
})
export default searchComment