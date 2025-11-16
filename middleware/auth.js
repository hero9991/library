import { validateAccessToken } from '../controllers/token.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return next(res.status(401).json({ message: 'User is not logged in' }))

        const decodedData = validateAccessToken(token)
        if (!decodedData) return next(res.status(401).json({ message: 'Invalid credentials' }))
        req.user = { email: decodedData.email, id: decodedData.id } // why do we need this?

        next()
    } catch (error) {
        next(res.status(401).json({ message: error || 'auth catch block' }))
    }
}

export default auth