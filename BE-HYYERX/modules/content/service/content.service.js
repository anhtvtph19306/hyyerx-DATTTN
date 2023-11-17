import contentModel from "../model/content.model.js"

export const createContents = async (req) => {
    const Contents = await contentModel.create({
        ...req.body
    })
    return Contents
}


export const deleteContents = async (req) => {
    const remove = await contentModel.findByIdAndDelete(req.params.id)
    return remove
}

export const getAllContent = async () => {
    const contents = await contentModel.find()
    return contents
}

export const searchContents = async (req) => {
    const { hidden } = req.query;
    const comments = await contentModel.find({
        hidden: {
            $regex: '.*' + hidden + '.*',
            $options: 'i'
        }
    })
    return comments;
}

export const updateContent = async (req) => {
    const update = await contentModel.updateOne(
        {
            _id: req.params.id
        },
        {
            ...req.body
        }
    )
    return update
}