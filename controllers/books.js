import Book from '../models/book.js'
import User from '../models/user.js'

export const getBooks = async (req, res) => {
    const { type, chunkNumber, sort, topic, isReversed } = req.query

    try {
        const LIMIT = 3
        const countToSkip = (Number(chunkNumber) - 1) * LIMIT
        const total = topic === 'all'
            ? await Book.countDocuments({ type })
            : await Book.countDocuments({ type, topic })

        const sortBy = sort === 'byPopularity'
            ? 'viewCount'
            : sort === 'byRating'
                ? 'rating'
                : 'title'
        let sortDirection = sortBy === 'title' ? 1 : -1
        sortDirection = isReversed === 'true' ?  -sortDirection : sortDirection

        const bookData = topic === 'all'
            ? await Book.find({ type }).sort({ [sortBy]: sortDirection }).limit(LIMIT).skip(countToSkip)
            : await Book.find({ type, topic }).sort({ [sortBy]: sortDirection }).limit(LIMIT).skip(countToSkip) //sorting 

        res.status(200).json({ books: bookData, currentChunk: Number(chunkNumber), numberOfChunk: Math.ceil(total / LIMIT) })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

export const getSliderBooks = async (req, res) => {
    const { type } = req.query

    try {
        const bookData = await Book.find({ type }).sort({ viewCount: -1 }).limit(20)

        res.status(200).json({ books: bookData })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getBooksBySearch = async (req, res) => {
    const { searchQuery } = req.query

    try {
        const searchText = new RegExp(searchQuery, 'i')

        const bookData = await Book.find({ $or: [{ title: searchText }, { author: searchText }] })

        res.status(200).json({ books: bookData })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getMyBooks = async (req, res) => {
    try {
        const user = await User.findById(req.query.id)
        if (!user) return res.status(401).json({ message: 'User is not available' })

        const bookData = await Book.find({ _id: { $in: user.books } })

        res.status(200).json(bookData)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getBookById = async (req, res) => {
    try {
        const bookData = await Book.findById(req.query.id)

        res.status(200).json({ book: bookData })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const addBook = async (req, res) => {
    const { bookId, userId } = req.body

    try {
        const userData = await User.findById(userId)
        if (!userData) return res.status(401).json({ message: 'User is not available' })

        const bookItemData = await Book.findById(bookId) // maybe simplify and delete; use instead bookId
        if (!bookItemData) return res.status(401).json({ message: 'Book is not available' })

        const targetBook = userData.books.find(bookId => bookId === bookItemData._id.toString())
        if (targetBook) {
            await User.updateOne({ _id: userId }, { $pull: { books: bookItemData._id } })
        } else {
            await User.updateOne({ _id: userId }, { $push: { books: bookItemData._id } })
        }

        const userBooks = (await User.findById(userId)).books
        res.status(201).json(userBooks)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}
