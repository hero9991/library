import mongoose from 'mongoose'

const starRatingSchema = mongoose.Schema({
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    rating: { type: String, required: true }
})

const StarRating = mongoose.model('StarRating', starRatingSchema)

export default StarRating