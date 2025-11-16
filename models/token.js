import mongoose from 'mongoose'

const tokenSchema = mongoose.Schema({
    refreshToken: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Token = mongoose.model('Token', tokenSchema)

export default Token