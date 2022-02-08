import express from 'express'

import { addBook, getBookById, getBooks, getSliderBooks, getBooksBySearch, getMyBooks } from '../controllers/books.js'
import { getUserRatings, incrementView, setRating } from '../controllers/bookInteraction.js'
import auth from '../middleware/auth.js'
import adminAuth from '../middleware/adminAuth.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file)
        console.log(123)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
        }
    }
})

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
const cpUpload = upload.fields([{ name: 'book', maxCount: 1 }, { name: 'book1', maxCount: 1 }])
router.post('/upload', adminAuth, cpUpload, (req, res) => {
   console.log(req.files)
   res.status(201).json({ files: req.files })
})

export default router