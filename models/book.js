import mongoose from 'mongoose'

const bookSchema = mongoose.Schema({
    titleRU: String,
    titleEN: String,
    titleAM: String,
    authorRU: String,
    authorEN: String,
    authorAM: String,
    descriptionRU: String,
    descriptionAM: String,
    descriptionEN: String,
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
    linkImage: String,
    pdfRU: String,
    pdfEN: String,
    pdfAM: String,
    epubRU: String,
    epubEN: String,
    epubAM: String,
})

const Book = mongoose.model('Book', bookSchema)

export default Book