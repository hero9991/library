import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';

import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(function(request, response, next) {
    console.log(request.secure)
    if (!request.secure) {
        console.log("https://" + request.headers.host + request.url)
       return response.redirect('https://' + request.headers.host + request.url);
    }
    next();
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/client/build')));
 
app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL] }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',  express.static('uploads'))

app.use('/api', bookRoutes)
app.use('/api', userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch(error => console.log(error))