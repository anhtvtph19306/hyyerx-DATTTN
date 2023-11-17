import getComment from './api/getComment.controller.js';
import createComment from './api/createComment.controller.js';
import deleteComment from './api/deleteComment.controller.js';
import getAllComment from './api/getAllComment.controller.js';
import updateComment from './api/updateComment.controller.js';
import getOneComment from './api/getOneComment.component.js';
import searchComment from './api/searchComment.controller.js';
const commnetController = {
    getComment,
    createComment,
    deleteComment,
    getAllComment,
    updateComment,
    getOneComment,
    searchComment
}

export default commnetController