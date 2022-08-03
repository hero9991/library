import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv  from "dotenv"

import bookRoutes from './routes/books.js'
import userRoutes from './routes/users.js'

dotenv.config()

const app = express()

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