import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { deleteContents } from '../../service/content.service.js';

const deleteContent = catchAsync(async (req, res) => {
    await deleteContents(req)
    return res.status(status.OK).json("xoá thành công")
})
export default deleteContent