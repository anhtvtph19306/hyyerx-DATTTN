import getAllContents from './api/getAllContent.controller.js';
import searchContent from './api/searchContent.controller.js';
import deleteContent from './api/deleteContent.controller.js';
import createContent from './api/createContent.controller.js';
import updateContents from './api/updateContent.controller.js';

const contentController = {
    getAllContents,
    searchContent,
    deleteContent,
    updateContents,
    createContent
}
export default contentController