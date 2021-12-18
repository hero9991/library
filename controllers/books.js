import Book from '../models/book.js'

export const getBook = async (req, res) => {
    try {
        const bookData = await Book.find()

        res.status(200).json(bookData)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}