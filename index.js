import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';

import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

const app = express()
console.log(1)
const __filename = fileURLToPath(import.meta.url);
console.log(__filename)
const __dirname = path.dirname(__filename);
console.log(__dirname)
app.use(express.static(path.join(__dirname, '/client/build')));
 
app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL, 'http://192.168.1.145:3000', 'https://library-am.herokuapp.com'] }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',  express.static('uploads'))

app.use('/api', bookRoutes)
app.use('/api', userRoutes)

const PORT = process.env.PORT || 5000
console.log(process.env.CONNECTION_URL)
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server runnning on port: ${PORT}`)))
    .catch(error => console.log(error))