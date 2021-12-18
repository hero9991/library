import express from 'express'

import { getBook } from '../controllers/books.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/books', auth,  getBook) 

export default router;