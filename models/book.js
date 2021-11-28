import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    date: Date,
    rating: {
        type: Number,
        default: 0
    },
    cover: String,
    link: String,
})

const Book = mongoose.model('Book', bookSchema)

export default Book