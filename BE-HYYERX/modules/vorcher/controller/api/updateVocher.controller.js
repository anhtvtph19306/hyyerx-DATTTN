import status from "http-status"
import { updateVorchers } from "../../service/vorcher.service.js"
import catchAsync from "../../../../utils/catchAsync.js"

const updateVorcher = catchAsync(async (req, res) => {
    const category = await updateVorchers(req)
    return res.status(status.OK).json(category)
})

export default updateVorcher