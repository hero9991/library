import { OAuth2Client } from 'google-auth-library';
import { validateAccessToken } from '../controllers/token.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) next(res.status(401).json({ message: 'User is not logged in' }))

        const isCustomAuth = token.length < 500;

       // let decodedData;

        // if (token && isCustomAuth) {
            const decodedData = validateAccessToken(token)
            if (!decodedData) return next(res.status(401).json({ message: 'Invalid credentials' }))
            req.user = { email: decodedData.email, id: decodedData.id } // why do we need this?
        // } else {
        //     const client = new OAuth2Client()
        //     decodedData = (await client.verifyIdToken({
        //         idToken: token,
        //         audience: process.env.GOOGLE_CLIENT_ID,
        //     })).getPayload()

        //     if (decodedData?.iss !== 'accounts.google.com' && decodedData?.aud !== GOOGLE_CLIENT_ID) return next(res.status(400).json({ message: 'Invalid credentials' }))

        //     req.user = { name: decodedData.name, email: decodedData.email, picture: decodedData.picture }
        // }

        next()
    } catch (error) {
        console.log(error)
        next(res.status(401).json({ message: error || 'auth catch block' }))
    }
}

export default auth