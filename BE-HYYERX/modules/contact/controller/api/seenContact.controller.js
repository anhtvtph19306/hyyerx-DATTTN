import catchAsync from "../../../../utils/catchAsync.js"
import status from 'http-status'
import { seenContacts } from "../../service/contact.service.js"

const seenContact = catchAsync(async (req, res) => {
    const sendEmail = await seenContacts(req)
    return res.status(status.OK).json(sendEmail)
})
export default seenContact