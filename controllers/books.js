import Book from '../models/book.js'

export const getBook = async (req, res) => {
    try {
        const book = await Book.find()

        res.status(200).json(book)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}