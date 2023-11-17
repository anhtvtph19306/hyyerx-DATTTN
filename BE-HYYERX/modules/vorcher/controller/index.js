
import createVorcher from './api/createVocher.controller.js';
import getAllVorcher from './api/getAllVorcher.controller.js';
import deleteVorcher from './api/deleteVocher.controller.js';
import updateVorcher from './api/updateVocher.controller.js';
import searchVouchers from './api/searchVorcher.controller.js';

const vorcherController = {
    getAllVorcher,
    deleteVorcher,
    updateVorcher,
    searchVouchers,
    createVorcher
}
export default vorcherController