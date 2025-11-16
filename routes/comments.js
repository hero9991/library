import express from 'express'

import { createComment, deleteComment, getComments, reactComment, updateComment } from "../controllers/comments.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/comments', getComments)
router.post('/createComment', auth, createComment)
router.post('/updateComment', auth, updateComment)
router.post('/deleteComment', auth, deleteComment)
router.post('/reactComment', auth, reactComment)

export default router

