import Token from '../models/token.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const refresh = async (req, res) => {
    const { refreshToken } = req.cookies

    try {
        console.log(123)
        if (!refreshToken) return res.status(401).json({ message: 'User is not logged in' })
        console.log(1234)
        const decodedData = validateRefreshToken(refreshToken)
        console.log(decodedData)
        const tokenFromDB = await findToken(refreshToken)
        if (!decodedData || !tokenFromDB) return res.status(401).json({ message: 'Invalid credentials' })

        const user = await User.findById(decodedData.id);

        const tokens = generateTokens({ email: user.email, id: user._id });
        await saveToken(user._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }) //secure to true!!!!!

        return res.status(200).json({ result: decodedData, ...tokens })
    } catch (error) {
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

export const validateRefreshToken = (refreshToken) => {
    try {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    } catch (e) {
        return null
    }
}

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
        accessToken,
        refreshToken
    }
}

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId })

    if (tokenData) {
        tokenData.refreshToken = refreshToken
        return tokenData.save()
    }

    const token = await Token.create({ user: userId, refreshToken })
    return token
}

export const removeToken = async (refreshToken) => {
    const tokenData = await Token.deleteOne({ refreshToken })
    return tokenData
}