import Book from '../models/book.js'
import User from '../models/user.js'
import { unlink } from 'node:fs';

export const getBooks = async (req, res) => {
    const { type, chunkNumber, sort, topic, isReversed, language} = req.query

    try {
        const LIMIT = 5
        const countToSkip = (Number(chunkNumber) - 1) * LIMIT
        const total = topic === 'all'
            ? await Book.countDocuments({ type })
            : await Book.countDocuments({ type, topic })

        const title = 'title' + language
        const sortBy = sort === 'byPopularity'
            ? 'viewCount'
            : sort === 'byRating'
                ? 'rating'
                : title
        let sortDirection = sortBy === title ? 1 : -1
        sortDirection = isReversed === 'true' ?  -sortDirection : sortDirection

        const bookData = topic === 'all'
            ? await Book.find({ type })
                        .sort({ [sortBy]: sortDirection, _id: -1 })
                        .limit(LIMIT)
                        .skip(countToSkip)
            : await Book.find({ type, topic })
                        .sort({ [sortBy]: sortDirection, _id: -1 })
                        .limit(LIMIT)
                        .skip(countToSkip)

        res.status(200).json({ books: bookData, currentChunk: Number(chunkNumber), numberOfChunk: Math.ceil(total / LIMIT) })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getSliderBooks = async (req, res) => {
    const { type } = req.query

    try {
        const bookData = await Book.find({ type })
                                   .sort({ viewCount: -1 })
                                   .limit(20)

        res.status(200).json({ books: bookData })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getBooksBySearch = async (req, res) => {
    const { searchQuery, chunkNumber } = req.query

    try {
        const searchText = new RegExp(searchQuery, 'i')
        const LIMIT = 5
        const countToSkip = (Number(chunkNumber) - 1) * LIMIT
        const searchObject = {
            $or: [
                { titleRU: searchText }, 
                { titleEN: searchText },   
                { titleAM: searchText }, 
                { authorRU: searchText }, 
                { authorEN: searchText }, 
                { authorAM: searchText }] 
        }
        const total = await Book.countDocuments(searchObject)
        const bookData = await Book.find(searchObject).sort({ viewCount: -1, _id: -1 })
                                                  .limit(LIMIT)
                                                  .skip(countToSkip)
        res.status(200).json({ books: bookData, currentChunk: Number(chunkNumber), numberOfChunk: Math.ceil(total / LIMIT)  })
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

        const userBookIds = (await User.findById(userId)).books
        const userBooks = await Book.find({ _id: { $in: userBookIds } })
        res.status(201).json({ userBookIds, userBooks })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const uploadBook = async (req, res) => {
    const { titleRU, titleEN, titleAM, descriptionRU, descriptionEN, descriptionAM, authorRU, authorEN, authorAM, date, topic, type } = req.body

    try {
        const filePath = '/uploads/'
        const createdBook = await Book.create({ titleRU, titleEN, titleAM, descriptionRU, descriptionEN, descriptionAM, authorRU, authorEN, authorAM, date, topic, type,
            linkImage: `${filePath}${req.files.image[0]?.filename}`,
            pdfRU: req.files.pdfRU ? `${filePath}${req.files.pdfRU[0].filename}` : '',
            pdfEN: req.files.pdfEN ? `${filePath}${req.files.pdfEN[0].filename}` : '',
            pdfAM: req.files.pdfAM ? `${filePath}${req.files.pdfAM[0].filename}` : '',
            epubRU: req.files.epubRU ? `${filePath}${req.files.epubRU[0].filename}` : '',
            epubEN: req.files.epubEN ? `${filePath}${req.files.epubEN[0].filename}` : '',
            epubAM: req.files.epubAM ? `${filePath}${req.files.epubAM[0].filename}` : ''})
        res.status(201).json({ createdBook })
    } catch (error) {
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const updateBookInfo = async (req, res) => {
    const { bookId, titleRU, titleEN, titleAM, descriptionRU, descriptionEN, descriptionAM, authorRU, authorEN, authorAM, date, topic, type } = req.body

    try {
        const bookToUpdate = await Book.findById(bookId)
        await Book.updateOne({ _id: bookId }, { $set: { 
            titleRU: titleRU || bookToUpdate.titleRU,
            titleEN: titleEN || bookToUpdate.titleEN, 
            titleAM: titleAM || bookToUpdate.titleAM,  
            descriptionRU: descriptionRU || bookToUpdate.descriptionRU,  
            descriptionEN: descriptionEN || bookToUpdate.descriptionEN,  
            descriptionAM: descriptionAM || bookToUpdate.descriptionAM,  
            authorRU: authorRU || bookToUpdate.authorRU, 
            authorEN: authorEN || bookToUpdate.authorEN, 
            authorAM: authorAM || bookToUpdate.authorAM, 
            date: date || bookToUpdate.date, 
            topic: topic || bookToUpdate.topic, 
            type: type || bookToUpdate.type
        }})
        const updatedBook = await Book.findById(bookId)

        res.status(201).json({ updatedBook })
    } catch (error) {
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const addBookFile = async (req, res) => {
    const { bookId, bookFormat } = req.body

    try {
        const filePath = '/uploads/'
        await Book.findByIdAndUpdate(bookId, { [bookFormat]: `${filePath}${req.file.filename}` });

        const updatedBook = await Book.findById(bookId)

        res.status(201).json({ updatedBook })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const deleteBookFile = async (req, res) => {
    const { bookId, bookFormat } = req.body

    try {
        const book = await Book.findById(bookId);
        unlink(book[bookFormat].substring(1), async (err) => {
            if (err) throw err;
            console.log('path/file.txt was deleted');
        })

        await Book.findByIdAndUpdate(bookId, {[bookFormat]: ''})
        const updatedBook = await Book.findById(bookId)

        res.status(201).json({ updatedBook })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}
