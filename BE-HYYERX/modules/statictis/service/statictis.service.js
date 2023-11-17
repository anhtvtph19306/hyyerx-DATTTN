import productModel from "../../product/model/product.model.js"
import orderModel from "../../order/model/order.model.js"
export const getStatistics = async () => {
    const orders = await orderModel.find();

    const productPurchaseCount = {};

    orders.forEach(order => {
        order.productOrder.forEach(item => {
            const productId = item.product._id;
            const quantity = item.quantityOrder.quantity;
            if (productPurchaseCount[productId]) {
                productPurchaseCount[productId] += quantity;
            } else {
                productPurchaseCount[productId] = quantity;
            }
        });
    });

    const products = await productModel.find();

    const result = products.map(product => ({
        name: product.name,
        totalSold: productPurchaseCount[product._id] || 0
    }));

    result.sort((a, b) => b.totalSold - a.totalSold);

    return result;
}

export const statisticsMonneys = async (bodyRequest) => {
    const { startDate, endDate } = bodyRequest

    let startDateConvert = new Date(startDate);
    let endDateConvert = new Date(endDate);

    let boundaries = [startDateConvert]
    while (boundaries.slice(-1)[0] <= endDateConvert) {
        boundaries.push(
            new Date(new Date(boundaries.slice(-1)[0]).getTime() + (1000 * 60 * 60 * 24))
        )
    }

    const listOrderChart = await orderModel.aggregate([
        {
            $match: {
                $and: [
                    { "createdAt": { $gte: startDateConvert, $lte: endDateConvert } }
                ]
            }
        },
        {
            $bucket: {
                boundaries: boundaries,
                groupBy: "$createdAt",
                default: "other",
                output: {
                    subtotal: { $sum: 1 },
                    total: { $sum: "$total" },
                }
            }
        },
        {
            $densify: {
                field: "_id",
                range: {
                    step: 1,
                    unit: "day",
                    bounds: [startDateConvert, new Date(endDateConvert.setDate(endDateConvert.getDate() + 1))],
                }
            }
        },
        {
            $project: {
                total: { $ifNull: ["$total", 0] },
                subtotal: { $ifNull: ["$subtotal", 0] },
                date: { $dateToString: { format: "%Y-%m-%d", date: "$_id" } },
                _id: 0,
            }
        }

    ])

    const orders = await orderModel.aggregate([
        {
            $match: {
                $and: [
                    { "createdAt": { $gte: startDateConvert, $lte: endDateConvert } },
                ]
            }
        },
        {
            $unwind: "$productOrder"
        },
        {
            $lookup: {
                from: "products",
                localField: "productOrder.product",
                foreignField: "_id",
                as: "productInfo"
            }
        },
        {
            $unwind: "$productInfo"
        },
        {
            $set: {
                "productOrder.product": "$productInfo"
            }
        },
        {
            $group: {
                _id: "$_id",
                productOrder: { $push: "$productOrder" },
                createdAt: { $first: "$createdAt" },
                updatedAt: { $first: "$updatedAt" },
                __v: { $first: "$__v" }
            }
        }
    ])
    const totalQuantity = orders.reduce((total, order) => {
        const orderTotal = order.productOrder.reduce((orderTotal, product) => {
            return orderTotal + product.quantity * product.product.newPrice;
        }, 0);

        return total + orderTotal;
    }, 0);

    return { listOrderChart, orders, totalQuantity }
}