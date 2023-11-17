import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { getOneComments } from "../../service/comment.service.js";

const getOneComment = catchAsync(async (req, res) => {
    const comment = await getOneComments(req)
    return res.status(status.OK).json(comment)
})

export default getOneComment