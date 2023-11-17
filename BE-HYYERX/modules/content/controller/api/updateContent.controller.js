
import status from "http-status"
import { updateContent } from '../../service/content.service.js';
import catchAsync from "../../../../utils/catchAsync.js";

const updateContents = catchAsync(async (req, res) => {
    const contents = await updateContent(req)
    return res.status(status.OK).json(contents)
})
export default updateContents