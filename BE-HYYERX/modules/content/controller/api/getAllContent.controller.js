import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getAllContent } from "../../service/content.service.js";

const getAllContents = catchAsync(async (req, res) => {
    const contents = await getAllContent()
    return res.status(status.OK).json(contents)
})
export default getAllContents