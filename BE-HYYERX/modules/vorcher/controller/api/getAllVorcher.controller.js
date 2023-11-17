import status from 'http-status'
import catchAsync from './../../../../utils/catchAsync.js';
import { getAllVorchers } from '../../service/vorcher.service.js';

const getAllVorcher = catchAsync(async (req, res) => {
    const vorcher = await getAllVorchers()
    return res.status(status.OK).json(vorcher)
})
export default getAllVorcher