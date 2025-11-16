import StarRating from '../models/starRating.js'
import Book from '../models/book.js'

export const incrementView = async (req, res) => {
    const { bookId, viewCount } = req.body

    try {
        const incrementedViewCount = Number(viewCount) + 1
        await Book.findByIdAndUpdate(bookId, { viewCount: incrementedViewCount })
        res.status(201).json({ viewCount: incrementedViewCount })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const setRating = async (req, res) => {
    const { bookId, userId, rating } = req.body

    try {
        const bookItemData = await Book.findById(bookId)
        const ratingData = await StarRating.findOne({ bookId, userId })

        if (!bookItemData) return res.status(401).json({ message: 'Book is not available' })

        let newRatingCount = bookItemData.ratingCount
        if (ratingData) {
            ratingData.rating = rating
            await ratingData.save()
        } else {
            newRatingCount++
            await StarRating.create({ userId, bookId, rating })
        }

        const newRating = parseFloat((await getRatingPerBook(bookId)).toFixed(1))
        await Book.findByIdAndUpdate(bookId, { ratingCount: newRatingCount, rating: newRating })

        res.status(201).json({ ratingCount: newRatingCount, rating: newRating })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getUserRatings = async (req, res) => {
    try {
        const ratingData = await StarRating.find({ userId: req.query.userId })
       
        const bookIdToRating = {}
        ratingData.forEach((starRating) => bookIdToRating[starRating.bookId] = starRating.rating)

        res.status(201).json({ bookIdToRating })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

const getRatingPerBook = async bookId => {
    const ratingData = await StarRating.find({ bookId })
    return ratingData.reduce((previousRatingAggr, starRating) => previousRatingAggr + Number(starRating.rating), 0) / ratingData.length
}