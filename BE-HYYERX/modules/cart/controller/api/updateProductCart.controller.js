import catchAsync from "../../../../utils/catchAsync.js";
import productModel from "../../../product/model/product.model.js";
import status from "http-status"
import { updateProductCarts } from "../../service/cart.service.js";
const updateProductCart = catchAsync(async (req, res) => {
    const dataBody = {
        userId: req.user._id,
        productId: req.body.productId,
        quantity: req.body.quantity
    }

    const productLocalDB = await productModel.findOne({
        _id: dataBody.productId
    })

    if (productLocalDB.quantity < dataBody.quantity) {
        return res.status(status.BAD_REQUEST).json("vượt quá số lượng")
    }

    await updateProductCarts(dataBody)
    return res.status(status.OK).json("bạn đã update giỏ hàng thành công")
})

export default updateProductCart
