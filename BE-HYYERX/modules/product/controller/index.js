import createProduct from './api/createProduct.controller.js';
import getAllProduct from './api/getAllProduct.controller.js';
import getOneProduct from './api/getOneProduct.controller.js';
import deleteProduct from './api/deleteProduct.controller.js';
import updateProduct from './api/updateProduct.controller.js';
import searchProduct from './api/searchProduct.controller.js';
const productController = {
    createProduct,
    getAllProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    searchProduct
}

export default productController