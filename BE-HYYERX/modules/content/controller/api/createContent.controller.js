import status from 'http-status'
import catchAsync from "../../../../utils/catchAsync.js";
import { createContents } from '../../service/content.service.js';
const createContent = catchAsync(async (req, res) => {
    const contents = await createContents(req)
    return res.status(status.OK).json(contents)
})
export default createContent