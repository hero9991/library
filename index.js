import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';

import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/client/build')));
 
app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',  express.static('uploads'))

// app.use(function(req, res, next) {
//     console.log(req.secure)
//     console.log(req.headers['x-forwarded-proto'])
//     if (!req.secure && req.headers['x-forwarded-proto'] !== 'https') {
//         console.log('https://' + req.headers.host + req.url)
//        return res.redirect('https://' + req.headers.host + req.url);
//     }
//     next();
// })

app.use('/api', bookRoutes)
app.use('/api', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch(error => console.log(error))