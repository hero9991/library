import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    date: Date,
    ratingCount: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    type: String,
    topic: String,
    cover: String,
    link: String,
})

const Book = mongoose.model('Book', bookSchema)

export default Book