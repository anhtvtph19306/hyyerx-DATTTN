import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { searchContents } from "../../service/content.service.js";


const searchContent = catchAsync(async (req, res) => {
    const dataSearch = await searchContents(req)
    if (dataSearch.length == 0) {
        return res.status(status.NOT_FOUND).json("Không có từ khoá cần tìm kiếm");
    }

    return res.status(status.OK).json(dataSearch)
})

export default searchContent