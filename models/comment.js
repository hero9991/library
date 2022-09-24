import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    parentId: { type: String, required: true }, // PostId
    createdDate: { type: Date, required: true },
    body: { type: String, required: true },
    likes: { type: [String], default: []},
    dislikes: { type: [String], default: []},
    isUpdated: { type: Boolean, default: false }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment