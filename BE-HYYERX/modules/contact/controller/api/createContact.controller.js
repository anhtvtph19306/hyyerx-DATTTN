import catchAsync from "../../../../utils/catchAsync.js";
import status from 'http-status'
import { createContacts } from "../../service/contact.service.js";

const createContact = catchAsync(async (req, res) => {
    const contact = await createContacts(req)
    return res.status(status.OK).json(contact)
})

export default createContact