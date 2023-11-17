import vorcherModel from "../model/vorcher.model.js";

export const createVorchers = async (req) => {
    const vorcher = await vorcherModel.create({
        ...req.body
    })
    return vorcher;
}

export const getAllVorchers = async () => {
    const vorcher = await vorcherModel.find()
    return vorcher
}

export const deleteVorchers = async (req) => {
    const remove = await vorcherModel.findByIdAndDelete(req.params.id)
    return remove
}

export const updateVorchers = async (req) => {
    const id = req.params.id
    const update = await vorcherModel.updateOne({
        _id: id
    },
        {
            ...req.body
        }
    )
    return update
}

export const searchVoucher = async (req, res) => {
    const { code } = req.query;
    const searchRegex = new RegExp(code, "i");
    const vouchers = await vorcherModel.find({ code: searchRegex });
    return vouchers
};