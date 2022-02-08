import Token from '../models/token.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const refresh = async (req, res) => {
    console.log(0)
    const { refreshToken } = req.cookies

    try {
        if (!refreshToken) return res.status(401).json({ message: 'User is not logged in' })

        const decodedData = validateRefreshToken(refreshToken)
        const tokenFromDB = await findToken(refreshToken)

        if (!decodedData || !tokenFromDB) return res.status(401).json({ message: 'Invalid credentials' })

        const userData = await User.findById(decodedData.id);

        const tokens = await handleTokens(userData, res)

        return res.status(200).json(getResponse(userData, tokens))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error || 'refresh catch block' })
    }
}

const findToken = async (refreshToken) => {
    return await Token.findOne({ refreshToken })
}

export const validateAccessToken = (accessToken) => {
    try {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    } catch (e) {
        return null
    }
}

const validateRefreshToken = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
        return null
    }
}

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
        accessToken,
        refreshToken
    }
}

const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId })

    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }

    return Token.create({ user: userId, refreshToken })
}

export const removeToken = async refreshToken => {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
}

export const handleTokens = async (userData, res) => {
    const tokens = generateTokens({ email: userData.email, id: userData._id })

    await saveToken(userData._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }) //secure to true!!!!!
    return tokens
}

export const getResponse = (userData, tokens) => ({user: {email: userData.email, name: userData.name, _id: userData._id, books: userData.books}, accessToken: tokens.accessToken})