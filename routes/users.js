import express from 'express'
import { body } from 'express-validator'
import { refresh } from '../controllers/token.js'
import { signIn, signOut, signUp, authorizeGoogle } from '../controllers/user.js'

const router = express.Router()

router.post('/signin', signIn)
router.post('/signout', signOut)
router.post('/signup', [
    body('email', 'Email is not valid').notEmpty().isEmail(),
    body('password', 'Password is not valid').isLength({ min: 6 })
], signUp)
router.post('/authorizegoogle', authorizeGoogle)
router.get('/refresh', refresh)

export default router