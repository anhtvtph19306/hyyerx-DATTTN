import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    fullname: String,
    phoneNumber: String,
    city: String,
    district: String,
    commune: String,
    detailAddress: String,
    total: Number,
    orderStatus: {
        type: String,
        default: 'đang chờ duyệt',
        enum: ['đang chờ duyệt', 'đã nhận đơn', 'đang giao hàng', 'đã hoàn thành', 'đã huỷ'],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Auth"
    },
    productOrder: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ]
},
    {
        timestamps: true
    }
)

export default mongoose.model("Order", OrderSchema)
