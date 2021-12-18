import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.js'
import { removeToken, saveToken, generateTokens } from './token.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const userData = await User.findOne({ email })
        if (!userData) return res.status(400).json({ message: 'User does not exist.' })

        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

        const tokens = generateTokens({ email: userData.email, id: userData._id });
        await saveToken(userData._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }) //secure to true!!!!!

        res.status(200).json({ result: userData, ...tokens })
    } catch (error) {
        res.status(500).json({ message: error || 'signIn catch block' })
    }
}

export const signOut = async (req, res) => {
    const { refreshToken } = req.cookies

    try {
        const token = await removeToken(refreshToken)
        res.clearCookie('refreshToken')
        res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: error || 'signOut catch block' })
    }
}

export const signUp = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })

    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const userData = await User.findOne({ email })
        if (userData) return res.status(403).json({ message: 'User already exists.' })

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password do not match.' })
        const hashedPassword = await bcrypt.hash(password, 12)
        const cretedUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const tokens = generateTokens({ email: cretedUser.email, id: cretedUser._id })
        await saveToken(cretedUser._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }) //secure to true!!!!!

        res.status(201).json({ result: cretedUser, ...tokens })
    } catch (error) {
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const authorizeGoogle = async (req, res) => {
    const { token } = req.body

    try {
        const client = new OAuth2Client()
        const decodedData = (await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })).getPayload()

        if (decodedData?.iss !== 'accounts.google.com' && decodedData?.aud !== GOOGLE_CLIENT_ID) return res.status(400).json({ message: 'Invalid credentials' })
        
        let userData = await User.findOne({ email: decodedData.email })
        if (!userData) {
            const hashedPassword = await bcrypt.hash(decodedData.sub, 12) //correct password //unique or not also email
            userData = await User.create({ email: decodedData.email, name: decodedData.name, password: hashedPassword })
        }

        const tokens = generateTokens({ email: userData.email, id: userData._id });
        await saveToken(userData.id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }) //secure to true!!!!!

        res.status(200).json({ result: userData, ...tokens })
    } catch (error) {
        console.log(error || 'signIn catch block' )
        res.status(500).json({ message: error || 'signIn catch block' })
    }
}

