import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.js'
import { removeToken, handleTokens, getResponse } from './token.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        // return res.status(500).json({message: 'signIn catch block' })
        const userData = await User.findOne({ email })
        if (!userData) return res.status(400).json({ message: 'User does not exist.' })

        const isPasswordCorrect = await bcrypt.compare(password, userData.password)
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' })

         const tokens = await handleTokens(userData, res)

        res.status(200).json(getResponse(userData, tokens))
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
    console.log(errors)
    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })

    const { email, password, confirmPassword, firstName, lastName } = req.body
    console.log(email)
    try {
        const userData = await User.findOne({ email })
        if (userData) return res.status(403).json({ message: 'User already exists.' })

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password do not match.' })
        const hashedPassword = await bcrypt.hash(password, 12)
        const cretedUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const tokens = await handleTokens(cretedUser, res)

        res.status(200).json(getResponse(cretedUser, tokens))
    } catch (error) {
        console.log(1)
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const authorizeGoogleAccount = async (req, res) => {
    const { token } = req.body

    try {
        const client = new OAuth2Client()
        const decodedData = (await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        })).getPayload()
console.log(1)
        if (decodedData?.iss !== 'accounts.google.com' && decodedData?.aud !== GOOGLE_CLIENT_ID) return res.status(400).json({ message: 'Invalid credentials' })
        console.log(2)
        let userData = await User.findOne({ email: decodedData.email })
        if (!userData) {
            const hashedPassword = await bcrypt.hash(decodedData.sub, 12) //correct password //unique or not also email
            userData = await User.create({ email: decodedData.email, name: decodedData.name, password: hashedPassword })
        }
        console.log(3)
        const tokens = await handleTokens(userData, res)
        console.log(4)
        res.status(200).json(getResponse(userData, tokens))
    } catch (error) {
        console.log(error || 'signIn catch block')
        res.status(500).json({ message: error || 'signIn catch block' })
    }
} 