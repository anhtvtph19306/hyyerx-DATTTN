import status from 'http-status'
import { createVorchers } from '../../service/vorcher.service.js';
import catchAsync from './../../../../utils/catchAsync.js';

const createVorcher = catchAsync(async (req, res) => {
    const vorcher = await createVorchers(req)
    return res.status(status.OK).json(vorcher)
})
export default createVorcher