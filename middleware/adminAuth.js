import { validateAccessToken } from '../controllers/token.js';

const adminAuth = (req, res, next) => {
    try {
        const decodedUserData = getDecodedUserData(req)
        if (!isAdminUser(decodedUserData)) return next(res.status(401).json({ message: 'Invalid credentials' }))
        req.user = { email: decodedUserData.email, id: decodedUserData.id } // why do we need this?

        next()
    } catch (error) {
        next(res.status(401).json({ message: error || 'auth catch block' }))
    }
}

export const getDecodedUserData = (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return

    return validateAccessToken(token)
}
export const isAdminUser = (decodedUserData) => decodedUserData?.email === process.env.ADMIN_EMAIL

export default adminAuth