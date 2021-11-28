import express from 'express'

import { getBook } from '../controllers/books.js'

const router = express.Router()

router.get('/', getBook) 

export default router;