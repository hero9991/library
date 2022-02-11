import express from 'express'

import { addBook, getBookById, getBooks, getSliderBooks, getBooksBySearch, getMyBooks, uploadBook } from '../controllers/books.js'
import { getUserRatings, incrementView, setRating } from '../controllers/bookInteraction.js'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
import multer from 'multer'
import path from 'path'


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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'application/epub+zip' || file.mimetype === 'application/pdf') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .jpg, .jpeg, .epub and pdf formats are allowed!'))
        }
    }
})
const cpUpload = upload.fields([{ name: 'pdfRU', maxCount: 1 }, { name: 'pdfEN', maxCount: 1 }, { name: 'pdfAM', maxCount: 1 },
{ name: 'epubRU', maxCount: 1 }, { name: 'epubEN', maxCount: 1 }, { name: 'epubAM', maxCount: 1 }, { name: 'image', maxCount: 1 }])

router.post('/upload', adminAuth, cpUpload, uploadBook)

export default router