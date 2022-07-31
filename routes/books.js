import express from 'express'

import { addBook, getBookById, getBooks, getSliderBooks, getBooksBySearch, getMyBooks, uploadBook, deleteBookFile, addBookFile, updateBookInfo } from '../controllers/books.js'
import { getUserRatings, incrementView, setRating } from '../controllers/bookInteraction.js'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
import { cpUpload, cbUploadSingle, uploadNone } from '../middleware/multer.js'


const router = express.Router()

router.get('/books', getBooks)
router.get('/sliderBooks', getSliderBooks)
router.get('/books/search', getBooksBySearch)
router.get('/myBooks', auth, getMyBooks)
router.get('/book', getBookById)
router.get('/getUserRatings', getUserRatings)
router.post('/add', auth, addBook)
router.post('/incrementView', incrementView)
router.post('/setRating', auth, setRating)
router.post('/upload', adminAuth, cpUpload, uploadBook)
router.post('/updateBookInfo', adminAuth, uploadNone.none(), updateBookInfo)
router.post('/deleteBookFile', adminAuth, deleteBookFile)
router.post('/addBookFile', adminAuth, cbUploadSingle, addBookFile)

export default router