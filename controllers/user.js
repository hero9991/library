import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import { OAuth2Client } from 'google-auth-library'
import User from '../models/user.js'
import { removeToken, handleTokens, getResponse } from './token.js'

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
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

    if (!errors.isEmpty()) return res.status(400).json({ message: errors.array() })

    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const userData = await User.findOne({ email })
        if (userData) return res.status(403).json({ message: 'User already exists.' })

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password do not match.' })
        const hashedPassword = await bcrypt.hash(password, 12)
        const cretedUser = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const tokens = await handleTokens(cretedUser, res)

        res.status(200).json(getResponse(cretedUser, tokens))
    } catch (error) {
        res.status(500).json({ message: error || 'signUp catch block' })
    }
}

export const authorizeGoogleAccount = async (req, res) => {
    const { code } = req.body
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!code) return res.status(400).json({ message: 'Missing authorization code' })
    if (!googleClientId || !googleClientSecret) return res.status(500).json({ message: 'Google credentials are not configured' })

    try {
        const client = new OAuth2Client(googleClientId, googleClientSecret, 'postmessage')
        const { tokens } = await client.getToken(code)
        const idToken = tokens?.id_token
        if (!idToken) return res.status(400).json({ message: 'Unable to verify Google credentials' })

        const decodedData = (await client.verifyIdToken({
            idToken,
            audience: googleClientId,
        })).getPayload()

        if (!decodedData) return res.status(400).json({ message: 'Invalid credentials' })

        const isIssuerValid = decodedData.iss === 'accounts.google.com' || decodedData.iss === 'https://accounts.google.com'
        if (!isIssuerValid || decodedData.aud !== googleClientId) return res.status(400).json({ message: 'Invalid credentials' })

        let userData = await User.findOne({ email: decodedData.email })
        if (!userData) {
            console.log(decodedData.sub)
            const hashedPassword = await bcrypt.hash(decodedData.sub, 12) //correct password //unique or not also email
            const fallbackName = decodedData.name || `${decodedData.given_name || ''} ${decodedData.family_name || ''}`.trim() || decodedData.email
            userData = await User.create({ email: decodedData.email, name: fallbackName, password: hashedPassword })
        }

        const tokensToReturn = await handleTokens(userData, res)

        res.status(200).json(getResponse(userData, tokensToReturn))
    } catch (error) {
        res.status(500).json({ message: error || 'signIn catch block' })
    }
} 

export const setLanguage = async (req, res) => {
    const { language, userId } = req.body

    try {
        await User.findOneAndUpdate({ _id: userId }, { language })
        res.status(200).json({ language })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error || 'language catch block' })
    }
}